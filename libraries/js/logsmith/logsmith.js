import chalk from 'chalk';
import format from 'string-template';
import compile from 'string-template/compile.js';
import * as path from 'path'
import { readConfigFile } from './lib/fetchConfigs.js';
import { JSONLogDriver } from './lib/drivers.js';
import { consoleLogJSON, prepareJSONLog } from './lib/logUtility.js';

const defaultLogPrintPattern = "[{level}] {body}"

const LogFormats = {
    JSON: "json",
    STATEMENT: "statement"
}

const ChalkLog = {
    WARN: chalk.yellowBright,
    INFO: chalk.blue,
    CRITICAL: chalk.bgRed.gray,
    SUCCESS: chalk.green,
    FAILURE: chalk.red,
    CUSTOM: chalk.whiteBright
}

const LogLevels = {
    WARN: "WARN",
    INFO: "INFO",
    CRITICAL: "CRITICAL",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    CUSTOM: "CUSTOM"
}

export default class Logsmith {
    constructor(options, statement) {
        this.env = options.env || "default"
        this.logfile = options.logfile || null
        this.consoleOnly = options.console_only || true
        this.logFormat = options.logFormat || LogFormats.JSON
        this.logPrintPattern = statement || defaultLogPrintPattern
        this.compiledLogPattern = compile(this.logPrintPattern)
    }

    fetchConfigFromFile(filepath) {
        if (path.extname(filepath) == ".json") {
            const configs = readConfigFile("json", filepath)
            this.env = configs.env || "default"
            this.logfile = configs.logfile || null
            this.consoleOnly = configs.consoleOnly
            this.logFormat = Object.values(LogFormats).includes(configs.logFormat) ? configs.logFormat : LogFormats.JSON
            this.logPrintPattern = configs.logPrintPattern || defaultLogPrintPattern
            this.compiledLogPattern = compile(this.logPrintPattern)
        } else {
            return Error("File format error. Should be json or env.")
        }
    }

    INFO(log) {
        if (this.logFormat == LogFormats.JSON) {
            prepareJSONLog(LogLevels.INFO, log, this.env, function (JSONLog) {
                consoleLogJSON(LogLevels.INFO, ChalkLog.INFO, JSONLog)
            })
        }
    }

    WARN(log) {
        if (this.logFormat == LogFormats.JSON) {
            prepareJSONLog(LogLevels.WARN, log, this.env, function (JSONLog) {
                consoleLogJSON(LogLevels.WARN, ChalkLog.WARN, JSONLog)
            })
        }
    }


    CRITICAL(log) {
        if (this.logFormat == LogFormats.JSON) {
            prepareJSONLog(LogLevels.CRITICAL, log, this.env, function (JSONLog) {
                consoleLogJSON(LogLevels.CRITICAL, ChalkLog.CRITICAL, JSONLog)
            })
        }
    }

    SUCCESS(log) {
        if (this.logFormat == LogFormats.JSON) {
            prepareJSONLog(LogLevels.SUCCESS, log, this.env, function (JSONLog) {
                consoleLogJSON(LogLevels.SUCCESS, ChalkLog.SUCCESS, JSONLog)
            })
        }
    }

    FAILURE(log) {
        if (this.logFormat == LogFormats.JSON) {
            prepareJSONLog(LogLevels.FAILURE, log, this.env, function (JSONLog) {
                consoleLogJSON(LogLevels.FAILURE, ChalkLog.FAILURE, JSONLog)
            })
        }
    }

    LOG(loglevel, log) {
        loglevel = loglevel.toUpperCase().substring(0,8);
        if (this.logFormat == LogFormats.JSON) {
            prepareJSONLog(loglevel, log, this.env, function (JSONLog) {
                consoleLogJSON(loglevel, ChalkLog.CUSTOM, JSONLog)
            })
        }
    }

}