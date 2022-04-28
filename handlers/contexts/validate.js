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

export function validateLogHasSchema(newContext) {
    if (Array.isArray(newContext["kind"]["logs"])) {
        if (newContext["kind"]["logs"].length > 0) {
            if (newContext["kind"]["logs"].every(columnName => ["timestamp", "scope"].includes(columnName))) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    }
}

export function validateMetricHasSchema(newContext) {
    if (Array.isArray(newContext["kind"]["metrics"])) {
        if (newContext["kind"]["metrics"].length > 0) {
            if (newContext["kind"]["metrics"].every(key => ["timestamp"].includes(key))) {
                return false
            } else {
                return true
            }
        } else {
            return false
        }
    }
}