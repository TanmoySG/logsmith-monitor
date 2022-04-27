
export function validateNewContext(newContext, ContextRegistry) {
    // Check if Context Already exists in ContextRegistry
    if (newContext["context"] in ContextRegistry) {
        return false
    } else {
        // Check if ContextName, Origin and Kind are present in NewContext 
        if ("context" in newContext && "origin" in newContext && "kind" in newContext) {
            // Check for ContextName and Origin Validity
            if (newContext["context"].length < 0 && newContext["origin"].length < 0) {
                return false
            }
            // Cheeck if either of logs or metrics are present
            if (!("logs" in newContext["kind"]) || !("metrics" in newContext["kind"])) {
                return false
            }
            return true
        } else {
            return false
        }
    }
}

export function hasSchema(newContext, ContextRegistry){

}