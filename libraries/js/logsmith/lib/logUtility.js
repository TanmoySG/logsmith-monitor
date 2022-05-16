import chalk from 'chalk';
import format from 'string-template';

function formatLogLevel(loglevel){
    return loglevel.padEnd(8)
}


export function prepareJSONLog(logLevel, log, env, callback) {
    const JSONLog = {
        timestamp: Date.now(),
        logLevel: logLevel,
        env: env,
        ...log
    }
    callback(JSONLog)
}

export function consoleLogJSON(loglevel, chalkMode, JSONLog){
    loglevel = formatLogLevel(loglevel)
    console.log(
        chalkMode(`[${loglevel}]`),
        JSON.stringify(JSONLog)
    )
}

export function prepareStatementLog(logLevel, log, logFormat) {


}