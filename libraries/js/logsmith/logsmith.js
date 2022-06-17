import format from 'string-template';
import compile from 'string-template/compile.js';
import * as path from 'path'
import { readConfigFile } from './lib/fetchConfigs.js';
import { prepareJSONLog, consoleLogJSON, prepareStatementLog, consoleLogStatement } from './lib/logUtility.js';
import { ChalkLog, LogLevels, LogFormats } from './lib/specs.js';

const defaultLogStatementPattern = "[{level}] {body}"

export default class Logsmith {
    constructor(options, statement) {
        this.env = options.env || "default"
        this.logfile = options.logfile || null
        this.consoleOnly = options.console_only || true
        this.logFormat = options.logFormat || LogFormats.JSON
        this.logStatementPattern = statement || defaultLogStatementPattern
        this.compiledLogPattern = compile(this.logStatementPattern)
    }

    fetchConfigFromFile(filepath) {
        if (path.extname(filepath) == ".json") {
            const configs = readConfigFile("json", filepath)
            this.env = configs.env || "default"
            this.logfile = configs.logfile || null
            this.consoleOnly = configs.consoleOnly
            this.logFormat = Object.values(LogFormats).includes(configs.logFormat) ? configs.logFormat : LogFormats.JSON
            this.logStatementPattern = configs.logStatementPattern || defaultLogStatementPattern
            this.compiledLogPattern = compile(this.logStatementPattern)
        } else {
            return Error("File format error. Should be json or env.")
        }
    }

    INFO(log) {
        if (this.logFormat == LogFormats.JSON) {
            prepareJSONLog(LogLevels.INFO, log, this.env, function (LogJSON) {
                consoleLogJSON(LogLevels.INFO, ChalkLog.INFO, LogJSON)
            })
        } else if (this.logFormat == LogFormats.STATEMENT) {
            prepareStatementLog(LogLevels.INFO, log, this.env, this.compiledLogPattern, function (LogStatement) {
                consoleLogStatement(LogLevels.INFO, ChalkLog.INFO, LogStatement)
            })
        }
    }

    WARN(log) {
        if (this.logFormat == LogFormats.JSON) {
            prepareJSONLog(LogLevels.WARN, log, this.env, function (LogJSON) {
                consoleLogJSON(LogLevels.WARN, ChalkLog.WARN, LogJSON)
            })
        }
    }


    CRITICAL(log) {
        if (this.logFormat == LogFormats.JSON) {
            prepareJSONLog(LogLevels.CRITICAL, log, this.env, function (LogJSON) {
                consoleLogJSON(LogLevels.CRITICAL, ChalkLog.CRITICAL, LogJSON)
            })
        }
    }

    SUCCESS(log) {
        if (this.logFormat == LogFormats.JSON) {
            prepareJSONLog(LogLevels.SUCCESS, log, this.env, function (LogJSON) {
                consoleLogJSON(LogLevels.SUCCESS, ChalkLog.SUCCESS, LogJSON)
            })
        }
    }

    FAILURE(log) {
        if (this.logFormat == LogFormats.JSON) {
            prepareJSONLog(LogLevels.FAILURE, log, this.env, function (LogJSON) {
                consoleLogJSON(LogLevels.FAILURE, ChalkLog.FAILURE, LogJSON)
            })
        }
    }

    LOG(loglevel, log) {
        loglevel = loglevel.toUpperCase().substring(0, 8);
        if (this.logFormat == LogFormats.JSON) {
            prepareJSONLog(loglevel, log, this.env, function (LogJSON) {
                consoleLogJSON(loglevel, ChalkLog.CUSTOM, LogJSON)
            })
        }
    }

}