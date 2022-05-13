import chalk from 'chalk';

// const LISTENER

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
    constructor(options) {
        this.env = options.env || "default"
        this.logfile = options.logfile || null
        this.console_only = options.console_only || true
    }

    getParams() {
        return this.env
    }
}