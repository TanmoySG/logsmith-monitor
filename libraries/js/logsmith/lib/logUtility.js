import chalk from 'chalk';
import format from 'string-template';

function formatLogLevel(loglevel) {
    return loglevel.padEnd(8)
}


export function prepareJSONLog(logLevel, log, env, callback) {
    const LogJSON = {
        timestamp: Date.now(),
        logLevel: logLevel,
        env: env,
        ...log
    }
    callback(LogJSON)
}

export function consoleLogJSON(loglevel, chalkMode, LogJSON) {
    loglevel = formatLogLevel(loglevel)
    console.log(
        chalkMode(`[${loglevel}]`),
        JSON.stringify(LogJSON)
    )
}

export function prepareStatementLog(logLevel, log, env, logStatememtPattern, callback) {
    log = {
        timestamp: Date.now(),
        logLevel: logLevel,
        env: env,
        ...log
    }
    const LogStatement = logStatememtPattern(log)
    callback(LogStatement)
}

export function consoleLogStatement(loglevel, chalkMode, LogStatement) {
    loglevel = formatLogLevel(loglevel)
    console.log(
        chalkMode(`[${loglevel}]`),
        LogStatement
    )
}