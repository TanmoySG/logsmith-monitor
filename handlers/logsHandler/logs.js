import { JSONWriterGeneric } from '../utilities/jsonWriter.js';
import { validateExistingPublisher } from '../publishers/validate.js'
import { getPublisherRegistry } from '../publishers/publisher'
import { getContextRegistry } from '../contexts/context.js';
import { validateExistingContext } from '../contexts/validate.js';

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
    const PublisherRegistry = getPublisherRegistry();
    if (validateExistingPublisher(publisher, PublisherRegistry)){
        const ContextRegistry = getContextRegistry(publisher);
        if(validateExistingContext(context, ContextRegistry)){
            const LogRegistry = getLogRegistry(publisher, context);
            if(usesSchema(LogRegistry)){

            }else{
                
            }
        }
    }
}