import chalk from 'chalk';

const logLevels = {
    WARN: chalk.yellow,
    INFO: chalk.blue,
    CRITICAL : chalk.bgRed.gray,
    SUCCESS : chalk.green,
    FAILURE : chalk.red
}

// console.log(logLevels.INFO("INFO"))
// console.log(logLevels.WARN("WARN"))
// console.log(logLevels.CRITICAL("CRITICAL"))
// console.log(logLevels.SUCCESS("SUCCESS"))
// console.log(logLevels.FAILURE("FAILURE"))

class Logsmith{
    constructor(){
        
    }
}