import chalk from 'chalk';

export const DefaultLogStatementPattern = "[{timestamp}] {message}"

export const ChalkLog = {
    WARN: chalk.yellowBright,
    INFO: chalk.blue,
    CRITICAL: chalk.bgRed.gray,
    SUCCESS: chalk.green,
    FAILURE: chalk.red,
    CUSTOM: chalk.whiteBright
}

export const LogLevels = {
    WARN: "WARN",
    INFO: "INFO",
    CRITICAL: "CRITICAL",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE",
    CUSTOM: "CUSTOM"
}

export const LogFormats = {
    JSON: "json",
    STATEMENT: "statement"
}

export var logs = []

const PROTOCOLS = {
    "http": "http://",
    "https": "https://"
}

export const MonitorResponse = {
    publisher: {
        exists: "publisher.exists",
        invalid: "publisher.invalid",
        success: "publisher.success",
        missing: "publisher.missing"
    },
    context: {
        exists: "context.exists",
        invalid: "context.invalid",
        success: "context.success",
        missing: "context.missing"
    },
    log: {
        error: "log.error",
        success: "log.success"
    }
}