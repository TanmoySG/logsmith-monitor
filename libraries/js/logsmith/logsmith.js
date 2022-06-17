import * as path from 'path';
import compile from 'string-template/compile.js';
import { loggerRunner } from './lib/drivers.js';
import { readConfigFile } from './lib/fetchConfigs.js';
import { DefaultLogStatementPattern, LogFormats, LogLevels } from './lib/specs.js';
import { createMonitorNamespaces } from './monitor/monitor.js';
import { getMonitorConfigs } from './monitor/monitorConfigs.js';

export default class Logsmith {
    constructor(options) {
        this.env = options.env || "default"
        this.logfile = options.logfile || null
        this.consoleOnly = options.console_only || true
        this.logFormat = options.logFormat || LogFormats.JSON
        this.logStatementPattern = options.logStatementPattern || DefaultLogStatementPattern
        this.monitorLogging = options.monitorLogging || false
        this.monitorConfigs = getMonitorConfigs(options)
        this.compiledLogPattern = compile(this.logStatementPattern)
        return this
    }

    fetchConfigFromFile(filepath) {
        if (path.extname(filepath) == ".json") {
            const configs = readConfigFile("json", filepath)
            this.env = configs.env || "default"
            this.logfile = configs.logfile || null
            this.consoleOnly = configs.consoleOnly
            this.logFormat = Object.values(LogFormats).includes(configs.logFormat) ? configs.logFormat : LogFormats.JSON
            this.logStatementPattern = configs.logStatementPattern || DefaultLogStatementPattern
            this.monitorLogging = configs.monitorLogging || false
            this.monitorConfigs = getMonitorConfigs(configs)
            this.compiledLogPattern = compile(this.logStatementPattern)
            return this
        } else {
            throw Error("format not supported")
        }
    }

    // Creates Publisher and Context if it doesn't exist
    initializeMonitor() {
        if (this.monitorLogging == true && this.monitorConfigs != undefined) {
            createMonitorNamespaces(this.monitorConfigs.monitorListener, this.monitorConfigs, function (response) {
                return response
            })
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
            this.monitorLogging,
            this.monitorConfigs,
            this.monitorLiveness,
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
            this.monitorLogging,
            this.monitorConfigs,
            this.monitorLiveness,
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
            this.monitorLogging,
            this.monitorConfigs,
            this.monitorLiveness,
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
            this.monitorLogging,
            this.monitorConfigs,
            this.monitorLiveness,
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
            this.monitorLogging,
            this.monitorConfigs,
            this.monitorLiveness,
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
            this.monitorLogging,
            this.monitorConfigs,
            this.monitorLiveness,
            log
        )
    }
}