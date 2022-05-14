import chalk from 'chalk';
import format from 'string-template';

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
        this.console_only = options.console_only || true
        this.logPrintPattern = statement || defaultLogPrintPattern
    }

    getParams() {

    }

    log(logbody) {
        const logStatement = format(this.logPrintPattern, { level: logbody.level, body: JSON.stringify(logbody.body, null) })
        return logLevels.INFO(logStatement);
    }
}