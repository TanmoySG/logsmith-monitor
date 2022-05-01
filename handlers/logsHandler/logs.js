import { JSONWriterGeneric } from '../utilities/jsonWriter.js';

export function createLogRegistry(contextNamespacePath, logTemplate, callback) {
    const logNamespace = contextNamespacePath + "/" + "LogRegistry.json"
    JSONWriterGeneric(logNamespace, logTemplate, function (err) {
        callback(err);
    })
}

