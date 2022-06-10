import * as filesystem from 'fs';
import { nanoid } from 'nanoid';
import { JSONWriterGeneric } from "../utilities/jsonWriter.js";
import { validateExistingPublisher } from '../publishers/validate.js';
import { checkLogHasValidSchema, validateExistingContext, validateNewContext } from './validate.js';
import { getPublishersRegistry } from '../publishers/publisher.js';
import { createLogRegistry } from '../logsHandler/logs.js';
import { StandardizeIdentifier } from '../utilities/identifierUtility.js';

const ContextRegistryTemplate = {}

const defaultLogSchema = ["timestamp", "logLevel"]
const defaultMetricSchema = ["timestamp"]

const logRegistryTemplate = {
    "kind": "logs",
    "usesSchema": false,
    "schema": [],
    "defaults": [...defaultLogSchema],
    "logCount": 0,
    "logs": []
}

export function createContextRegistry(publisherNamespacePath, callback) {
    JSONWriterGeneric(publisherNamespacePath + "/ContextRegistry.json", ContextRegistryTemplate, function (err) {
        callback(err);
    });
}

export function getContextRegistry(publisher) {
    const ContextRegistryFilePath = `logfiles/${publisher}/ContextRegistry.json`;
    const ContextRegistry = JSON.parse(
        filesystem.readFileSync(ContextRegistryFilePath)
    );
    return ContextRegistry;
}

export function verifyContextExistence(publisher, context, callback) {
    publisher = StandardizeIdentifier(publisher);
    const PublisherRegistry = getPublishersRegistry();
    if (validateExistingPublisher(publisher, PublisherRegistry)) {
        const ContextRegistry = getContextRegistry(publisher);
        if (validateExistingContext(context, ContextRegistry)) {
            callback({
                status: "success",
                scope: "context.exists",
                message: "Context Exists"
            })
        } else {
            callback({
                status: "failed",
                scope: "context.missing",
                message: "Context Missing"
            })
        }
    } else {
        callback({
            status: "failed",
            scope: "publisher.missing",
            message: "Publisher missing"
        })
    }
}

export function addToContextsRegistry(publisher, newContext, callback) {
    publisher = StandardizeIdentifier(publisher);
    const PublisherRegistry = getPublishersRegistry();
    if (validateExistingPublisher(publisher, PublisherRegistry)) {
        const publisherProfile = PublisherRegistry[publisher]
        const publisherNamespacePath = publisherProfile["path"];
        const ContextRegistryFilePath = `logfiles/${publisher}/ContextRegistry.json`;
        const ContextRegistry = getContextRegistry(publisher);
        if (validateExistingContext(newContext["context"], ContextRegistry)) {
            callback({
                status: "failed",
                scope: "context.exists",
                message: "Context Exists"
            })
        }
        if (validateNewContext(newContext, ContextRegistry)) {
            const StandardizedContextIdentifier = StandardizeIdentifier(newContext["context"]);
            const contextNamespacePath = publisherNamespacePath + "/" + StandardizedContextIdentifier;

            // To-do : Enclose within Try-Catch Block
            filesystem.mkdirSync(contextNamespacePath);

            const newContextProfile = {
                "id": nanoid(6),
                "path": contextNamespacePath,
                "origin": newContext["origin"],
                "namespace": StandardizedContextIdentifier,
                "timestamp": Date.now(),
                "description": newContext["description"],
                "kind": {}
            };
            const logRegistryPath = `${contextNamespacePath}/LogsRegistry.json`
            if ("logs" in newContext["kind"]) {
                const logHasSchema = checkLogHasValidSchema(newContext);
                newContextProfile.kind["logs"] = {
                    "usesSchema": logHasSchema
                }
                if (logHasSchema) {
                    newContextProfile["kind"]["logs"]["path"] = logRegistryPath;
                    logRegistryTemplate["usesSchema"] = logHasSchema;
                    logRegistryTemplate["schema"] = [...newContext["kind"]["logs"], ...defaultLogSchema]
                } else {
                    newContextProfile["kind"]["logs"]["path"] = logRegistryPath;
                    logRegistryTemplate["usesSchema"] = logHasSchema;
                    logRegistryTemplate["schema"] = [...defaultLogSchema]
                }
                createLogRegistry(contextNamespacePath, logRegistryTemplate, function (err) {
                    if (err) { console.log(err); }
                    ContextRegistry[StandardizedContextIdentifier] = newContextProfile;
                    JSONWriterGeneric(ContextRegistryFilePath, ContextRegistry, function (err) {
                        if (err) { console.log(err); }
                    })
                })
            }

            callback({
                status: "success",
                message: "Context Added.",
                context: StandardizedContextIdentifier,
                scope: "context.success"
            })
        } else {
            callback({
                status: "failed",
                scope: "context.invalid",
                message: "Error in New Context."
            });
        }
    } else {
        callback({
            status: "failed",
            scope: "publisher.missing",
            message: "Publisher not in Registry."
        })
    }

}