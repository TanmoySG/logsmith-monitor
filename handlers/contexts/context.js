import * as filesystem from 'fs';
import { nanoid } from 'nanoid';
import { JSONWriterGeneric } from "../utilities/jsonWriter.js";
import { validateExistingPublisher } from '../publishers/validate.js';
import { checkLogHasValidSchema, checkMetricHasValidSchema, validateNewContext } from './validate.js';
import { getPublishersRegistry } from '../publishers/publisher.js';
import { createLogRegistry } from '../logsHandler/logs.js';

const ContextRegistryTemplate = {}

const defaultLogSchema = ["timestamp", "status"]
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

export function addToContextsRegistry(publisher, newContext, callback) {
    const PublisherRegistry = getPublishersRegistry();
    const ContextRegistryFilePath = `logfiles/${publisher}/ContextRegistry.json`;
    const ContextRegistry = getContextRegistry(publisher);
    if (validateExistingPublisher(publisher, PublisherRegistry)) {
        const publisherProfile = PublisherRegistry[publisher]
        const publisherNamespacePath = publisherProfile["path"];
        if (validateNewContext(newContext, ContextRegistry)) {
            const contextNamespacePath = publisherNamespacePath + "/" + newContext["context"];
            filesystem.mkdir(contextNamespacePath, function (err) {
                if (err) throw err;
                const newContextProfile = {
                    "id": nanoid(6),
                    "path": contextNamespacePath,
                    "origin": newContext["origin"],
                    "namespace": newContext["context"],
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
                        console.log(err);
                        ContextRegistry[newContext["context"]] = newContextProfile;
                        JSONWriterGeneric(ContextRegistryFilePath, ContextRegistry, function (err) {
                            console.log(err);
                        })
                    })
                }

                const metricRegistryPath = `${contextNamespacePath}/MetricsRegistry.json`
                if ("metrics" in Object.keys(newContext["kind"])) {
                    console.log("Unsupported.")
                }

                callback({
                    status: "success",
                    message: "Context Added."
                })
            })
        } else {
            callback({
                status: "failed",
                message: "Error in New Context."
            });
        }
    } else {
        callback({
            status: "failed",
            message: "Publisher not in Registry."
        })
    }

}