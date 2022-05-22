export function validateExistingPublisher(publisher, PublisherRegistry) {
    if (publisher in PublisherRegistry) {
        return true
    } else {
        return false
    }
}

export function validateLog(LogBody) {
    if (["context", "logLevel", "message"] in LogBody) {
        if (
            length(LogBody["context"]) != 0 &&
            length(LogBody["logLevel"]) != 0 &&
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
    if (validateExistingPublisher(newPublisher["publisher"], PublisherRegistry)) {
        return false
    } else {
        if ("publisher" in newPublisher && "origin" in newPublisher) {
            if (newPublisher["publisher"].length != 0 && newPublisher["origin"].length != 0) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
}