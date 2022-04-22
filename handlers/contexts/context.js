import * as filesystem from 'fs';
import { JSONWriterGeneric } from "../utilities/jsonWriter.js";
import { validateExistingPublisher } from '../publishers/validate.js';

const ContextRegistryTemplate = {}

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
    const ContextRegistry = getContextRegistry(publisher);
    if(validateExistingPublisher(publisher)){
        
    }else{
       callback({
           status : "failed",
           message : "Publisher not in Registry."
       })
    }
    
}