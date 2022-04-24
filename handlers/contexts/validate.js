// import 

export function validateNewContext(newContext, ContextRegistry) {
    if (newContext["context"] in ContextRegistry) {
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