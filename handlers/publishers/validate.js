import * as filesystem from 'fs';
import { JSONWriterGeneric } from "../utilities/jsonWriter.js";

function validateSchema(LogBody) {

}

export function validateLog(LogBody) {
    if (["context", "status", "message"] in LogBody) {
        if (
            length(LogBody["context"]) != 0 &&
            length(LogBody["status"]) != 0 &&
            length(LogBody["message"]) != 0
        ) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}

export function validatePublisher(newPublisher, PublisherRegistry) {
        if (newPublisher["publisher"] in PublisherRegistry){
             return false
        }else{
            return true
        }
}