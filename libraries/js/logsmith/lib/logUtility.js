import chalk from 'chalk';
import format from 'string-template';


export function prepareJSONLog(logLevel, log, env, callback) {
    const JSONLog = {
        timestamp: Date.now(),
        logLevel: logLevel,
        env: env,
        ...log
    }
    callback(JSONLog)
}

export function consoleLogJSON(chalkMode, JSONLog){
    console.log(
        chalkMode(`[${JSONLog.logLevel}]`),
        JSON.stringify(JSONLog)
    )
}

export function prepareStatementLog(logLevel, log, logFormat) {


}