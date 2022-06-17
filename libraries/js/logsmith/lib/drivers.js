import { consoleLogJSON, consoleLogStatement, prepareJSONLog, prepareStatementLog } from './logUtility.js';
import { ChalkLog, LogFormats } from './specs.js';

function transformStatementToJSON(statement) {
    const transformedLog = {
        message: statement
    }
    return transformedLog
}

export function loggerRunner(logLevel, env, compiledLogPattern, logFormat, log) {
    if (typeof log == "string") {
        log = transformStatementToJSON(log)
    }
    const chalkLog = ChalkLog[logLevel] || ChalkLog.CUSTOM
    if (logFormat == LogFormats.JSON) {
        prepareJSONLog(logLevel, log, env, function (LogJSON) {
            consoleLogJSON(logLevel, chalkLog, LogJSON)
        })
    } else if (logFormat == LogFormats.STATEMENT) {
        prepareStatementLog(logLevel, log, env, compiledLogPattern, function (LogStatement) {
            consoleLogStatement(logLevel, chalkLog, LogStatement)
        })
    }
}