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

export function validateNewPublisher(newPublisher, PublisherRegistry) {
    if (newPublisher["publisher"] in PublisherRegistry) {
        return false
    } else {
        if (["publisher", "origin"] in newPublisher) {
            if (length(newPublisher["publisher"]) != 0 && length(newPublisher["origin"]) != 0) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
}