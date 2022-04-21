import { JSONWriterGeneric } from "../utilities/jsonWriter.js";

const ContextRegistryTemplate = {}

export function createContextRegistry(publisherNamespacePath, callback) {
    JSONWriterGeneric(publisherNamespacePath + "/ContextRegistry.json", ContextRegistryTemplate, function (err) {
        callback(err);
    });
}