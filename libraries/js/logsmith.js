import chalk from 'chalk';

// 
// "WARNING": "yellow",
// "INFO": "blue",
// "SUCCESS": "green",
// "FAILURE": "red",
// "CRITICAL": "grey"
// 

const logLevels = {
    WARN: chalk.red,
    INFO: chalk.blue,
    CRITICAL : chalk.bgRed.gray
}

console.log(logLevels.INFO("test"))
console.log(logLevels.WARN("warn"))
console.log(logLevels.CRITICAL("crit"))