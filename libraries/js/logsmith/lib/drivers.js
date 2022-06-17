import { prepareJSONLog } from "./logUtility.js"

export function JSONLogDriver(log, loglevel, logenv, callback) {
    const preparedJSONLog = prepareJSONLog(loglevel, log, logenv)
    
    callback(preparedJSONLog)
}
