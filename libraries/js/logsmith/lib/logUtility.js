import format from 'string-template';

export function prepareJSONLog(logLevel, log, env) {
    const JSONLog = {
        timestamp: Date.now(),
        logLevel: logLevel,
        env: env,
        ...log
    }
    return JSONLog
}

export function consoleLogJSON(chalkMode, JSONLog){
    console.log(
        chalkMode(`[${JSONLog.logLevel}]`),
        JSONLog
    )
}

export function prepareStatementLog(logLevel, log, logFormat) {


}