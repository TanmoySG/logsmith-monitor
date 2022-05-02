// newContext["kind"]["logs"].every(columnName => ["timestamp", "status"].includes(columnName))

export function validateSchema(context, newLog){
    const logSchema = context["schema"];
    if(newLog.every(columnName => logSchema.includes(columnName))){
        return true
    }else{
        return false
    }
}