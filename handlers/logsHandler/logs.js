import { JSONWriterGeneric } from '../utilities/jsonWriter';

export function createLogRegistry(contextNamespacePath, logTemplate, callback) {
    const logNamespace = contextNamespacePath + "/" + "logs.json"
    JSONWriterGeneric(logNamespace, logTemplate, function (err) {
        callback(err);
    })
}

