import * as path from 'path';
import compile from 'string-template/compile.js';
import { loggerRunner } from './lib/drivers.js';
import { readConfigFile } from './lib/fetchConfigs.js';
import { getMonitorConfigs } from './monitor/monitorConfigs.js';
import { LogFormats, LogLevels, DefaultLogStatementPattern } from './lib/specs.js';


export default class Logsmith {
    constructor(options, statement) {
        this.env = options.env || "default"
        this.logfile = options.logfile || null
        this.consoleOnly = options.console_only || true
        this.logFormat = options.logFormat || LogFormats.JSON
        this.logStatementPattern = statement || DefaultLogStatementPattern
        this.compiledLogPattern = compile(this.logStatementPattern)
    }

    fetchConfigFromFile(filepath) {
        if (path.extname(filepath) == ".json") {
            const configs = readConfigFile("json", filepath)
            this.env = configs.env || "default"
            this.logfile = configs.logfile || null
            this.consoleOnly = configs.consoleOnly 
            this.logFormat = Object.values(LogFormats).includes(configs.logFormat) ? configs.logFormat : LogFormats.JSON
            this.logStatementPattern = configs.logStatementPattern || DefaultLogStatementPattern
            this.compiledLogPattern = compile(this.logStatementPattern)
            this.monitorConfigs = getMonitorConfigs(configs)
        } else {
            return Error("File format error. Should be json or env.")
        }
    }


    INFO(log) {
        loggerRunner(
            LogLevels.INFO,
            this.env,
            this.compiledLogPattern,
            this.logFormat,
            this.consoleOnly,
            this.logfile,
            log
        )
    }

    WARN(log) {
        loggerRunner(
            LogLevels.WARN,
            this.env,
            this.compiledLogPattern,
            this.logFormat,
            this.consoleOnly,
            this.logfile,
            log
        )
    }


    CRITICAL(log) {
        loggerRunner(
            LogLevels.CRITICAL,
            this.env,
            this.compiledLogPattern,
            this.logFormat,
            this.consoleOnly,
            this.logfile,
            log
        )
    }

    SUCCESS(log) {
        loggerRunner(
            LogLevels.SUCCESS,
            this.env,
            this.compiledLogPattern,
            this.logFormat,
            this.consoleOnly,
            this.logfile,
            log
        )
    }

    FAILURE(log) {
        loggerRunner(
            LogLevels.FAILURE,
            this.env,
            this.compiledLogPattern,
            this.logFormat,
            this.consoleOnly,
            this.logfile,
            log
        )
    }

    LOG(loglevel, log) {
        loglevel = loglevel.toUpperCase().substring(0, 8);
        loggerRunner(
            loglevel,
            this.env,
            this.compiledLogPattern,
            this.logFormat,
            this.consoleOnly,
            this.logfile,
            log
        )
    }
}