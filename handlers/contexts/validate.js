export function validateExistingContext(context, ContextRegistry) {
    if (context in ContextRegistry) {
        return true
    } else {
        return false
    }
}

export function validateNewContext(newContext, ContextRegistry) {
    if (validateExistingContext(newContext["context"], ContextRegistry)) {
        return false
    } else {
        if ("context" in newContext && "origin" in newContext && "kind" in newContext) {
            if (newContext["context"].length < 0 && newContext["origin"].length < 0) {
                return false
            }
            if (!("logs" in newContext["kind"]) || !("metrics" in newContext["kind"])) {
                return false
            }
            return true
        } else {
            return false
        }
    }
}

export function hasSchema(newContext, ContextRegistry) {

}