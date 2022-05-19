import { consoleLogJSON, consoleLogStatement, prepareJSONLog, prepareStatementLog } from './logUtility.js';
import { ChalkLog, LogFormats } from './specs.js';
import { writeLogToFile } from './logFileUtility.js';

function transformStatementToJSON(statement) {
    const transformedLog = {
        message: statement
    }
    return transformedLog
}


export function loggerRunner(logLevel, env, compiledLogPattern, logFormat, consoleOnly, logFilePath, log) {
    if (typeof log == "string") {
        log = transformStatementToJSON(log)
    }
    const chalkLog = ChalkLog[logLevel] || ChalkLog.CUSTOM
    if (logFormat == LogFormats.JSON) {
        prepareJSONLog(logLevel, log, env, function (LogJSON) {
            writeLogToFile(LogJSON, logFilePath, consoleOnly)
            consoleLogJSON(logLevel, chalkLog, LogJSON)
        })
    } else if (logFormat == LogFormats.STATEMENT) {
        prepareStatementLog(logLevel, log, env, compiledLogPattern, function (LogStatement, LogJSON) {
            writeLogToFile(LogJSON, logFilePath, consoleOnly)
            consoleLogStatement(logLevel, chalkLog, LogStatement)
        })
    }
}