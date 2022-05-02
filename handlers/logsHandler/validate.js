export function validateSchema(LogRegistry, newLog){
    const logSchema = LogRegistry["schema"];
    if(Object.keys(newLog).every(columnName => logSchema.includes(columnName))){
        return true
    }else{
        return false
    }
}