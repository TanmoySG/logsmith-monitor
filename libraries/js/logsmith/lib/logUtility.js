function formatLogLevel(loglevel) {
    return loglevel.padEnd(8)
}


export function prepareJSONLog(logLevel, log, env, callback) {
    const LogJSON = {
        timestamp: Date.now(),
        logLevel: logLevel,
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
        ...log
    }
    const LogStatement = logStatememtPattern(log)
    callback(LogStatement, log)
}

export function consoleLogStatement(loglevel, chalkMode, LogStatement) {
    loglevel = formatLogLevel(loglevel)
    console.log(
        chalkMode(`[${loglevel}]`),
        LogStatement
    )
}