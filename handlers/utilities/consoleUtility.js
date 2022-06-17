import chalk from "chalk";
import compile from "string-template/compile.js";

const loggingStatementHeader = "[{0} ~ {1}]"
const compiledLoggingStatementHeader = compile(loggingStatementHeader)

export function consoleLogger(publisher, context, log) {
    console.log(
        chalk.blueBright(compiledLoggingStatementHeader(publisher, context)),
        JSON.stringify(log)
    )
}