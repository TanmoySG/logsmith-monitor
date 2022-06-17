import chalk from 'chalk';
import format from 'string-template';
import * as path from 'path'
import { readConfigFile } from './lib/fetchConfigs.js';

// const LISTENER

const defaultLogPrintPattern = "[{level}] {body}"

const logLevels = {
    WARN: chalk.yellow,
    INFO: chalk.blue,
    CRITICAL: chalk.bgRed.gray,
    SUCCESS: chalk.green,
    FAILURE: chalk.red
}

// console.log(logLevels.INFO("INFO"))
// console.log(logLevels.WARN("WARN"))
// console.log(logLevels.CRITICAL("CRITICAL"))
// console.log(logLevels.SUCCESS("SUCCESS"))
// console.log(logLevels.FAILURE("FAILURE"))

export default class Logsmith {
    constructor(options, statement) {
        this.env = options.env || "default"
        this.logfile = options.logfile || null
        this.consoleOnly = options.console_only || true
        this.logPrintPattern = statement || defaultLogPrintPattern
    }

    fetchConfigFromFile(filepath) {
        if (path.extname(filepath) == ".json") {
            this.env, this.logfile, this.consoleOnly, this.logPrintPattern = readConfigFile("json", filepath)
        } else if (path.extname(filepath) == ".env") {

        } else {
            return Error("File format error. Should be json or env.")
        }
        return Logsmith
    }

    WARN(log) {

    }



    // log(logbody) {
    //     const logStatement = format(
    //         this.logPrintPattern, 
    //         {  
    //             level: logbody.level, 
    //             body: JSON.stringify(logbody.body, null)
    //         }
    //     )
    //     return logLevels.INFO(logStatement);
    // }
}