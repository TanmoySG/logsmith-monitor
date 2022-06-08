import { consoleLogJSON, consoleLogStatement, prepareJSONLog, prepareStatementLog } from './logUtility.js';
import { ChalkLog, LogFormats } from './specs.js';
import { writeLogToFile } from './logFileUtility.js';
import { monitorLogRunner } from '../monitor/monitor.js';

function transformStatementToJSON(statement) {
    const transformedLog = {
        message: statement
    }
    return transformedLog
}


export function loggerRunner(logLevel, env, compiledLogPattern, logFormat, consoleOnly, logFilePath, monitorLogging, monitorConfig, monitorLiveness, log) {
    if (typeof log == "string") {
        log = transformStatementToJSON(log)
    }
    const LISTENER = monitorConfig.monitorListener
    const chalkLog = ChalkLog[logLevel] || ChalkLog.CUSTOM
    if (logFormat == LogFormats.JSON) {
        prepareJSONLog(logLevel, log, env, function (LogJSON) {
            if (monitorLogging) {
                monitorLogRunner(LISTENER, monitorConfig, LogJSON, function (response) { return response })
            }
            writeLogToFile(LogJSON, logFilePath, consoleOnly)
            consoleLogJSON(logLevel, chalkLog, LogJSON)
        })
    } else if (logFormat == LogFormats.STATEMENT) {
        prepareStatementLog(logLevel, log, env, compiledLogPattern, function (LogStatement, LogJSON) {
            if (monitorLogging) {
                monitorLogRunner(LISTENER, monitorConfig, LogJSON, function (response) { return response })
            }
            writeLogToFile(LogJSON, logFilePath, consoleOnly)
            consoleLogStatement(logLevel, chalkLog, LogStatement)
        })
    }
}