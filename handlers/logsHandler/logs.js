import * as filesystem from 'fs';
import { JSONWriterGeneric } from '../utilities/jsonWriter.js';
import { validateExistingPublisher } from '../publishers/validate.js'
import { getPublishersRegistry } from '../publishers/publisher.js'
import { getContextRegistry } from '../contexts/context.js';
import { validateExistingContext } from '../contexts/validate.js';
import { validateSchema } from './validate.js';

export function usesSchema(LogRegistry) {
    return LogRegistry.usesSchema
}

export function createLogRegistry(contextNamespacePath, logTemplate, callback) {
    const logNamespace = contextNamespacePath + "/" + "LogRegistry.json"
    JSONWriterGeneric(logNamespace, logTemplate, function (err) {
        callback(err);
    })
}

export function getLogRegistry(publisher, context) {
    const LogRegistryFilePath = `logfiles/${publisher}/${context}/LogRegistry.json`;
    const LogRegistry = JSON.parse(
        filesystem.readFileSync(LogRegistryFilePath)
    );
    return LogRegistry;
}

export function registerNewLog(publisher, context, newLog, callback) {
    const PublisherRegistry = getPublishersRegistry();
    if (validateExistingPublisher(publisher, PublisherRegistry)) {
        const ContextRegistry = getContextRegistry(publisher);
        if (validateExistingContext(context, ContextRegistry)) {
            const LogRegistryFilePath = `logfiles/${publisher}/${context}/LogRegistry.json`;
            var LogRegistry = getLogRegistry(publisher, context);
            var newLogObject = {};
            if (!("timestamp" in newLog)) {
                newLog["timestamp"] = Date.now();
            }
            if (usesSchema(LogRegistry)) {
                if (validateSchema(LogRegistry, newLog)) {
                    newLogObject = { ...newLog };
                    LogRegistry["logs"].unshift(newLogObject);
                    JSONWriterGeneric(LogRegistryFilePath, LogRegistry, function (err) {
                        if (err) throw err;
                        callback({
                            "status": "success",
                            "message": "Log Registered"
                        })
                    })
                } else {
                    callback({
                        "status": "failed",
                        "message": "Schema Mismatch"
                    })
                }
            } else {
                newLogObject = { ...newLog };
                LogRegistry["logs"].push(newLogObject);
                JSONWriterGeneric(LogRegistryFilePath, LogRegistry, function (err) {
                    if (err) throw err;
                    callback({
                        "status": "success",
                        "message": "Log Registered"
                    })
                })
            }
        }
    }
}

export function getLogs(publisher, context, callback) {
    const PublisherRegistry = getPublishersRegistry();
    if (validateExistingPublisher(publisher, PublisherRegistry)) {
        const ContextRegistry = getContextRegistry(publisher);
        if (validateExistingContext(context, ContextRegistry)) {
            var LogRegistry = getLogRegistry(publisher, context);
            if (LogRegistry["logs"].length <= 0) {
                callback({
                    "status": "success",
                    "count": 0,
                    "log": []
                })
            }
            callback({
                "status": "success",
                "count": LogRegistry["logs"].length,
                "log": LogRegistry["logs"]
            })
        }
    }
}