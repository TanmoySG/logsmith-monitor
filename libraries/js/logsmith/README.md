# LogsmithJS

LogsmithJS is a Logging Library for Node JS apps with support for [logsmith-monitor](https://github.com/TanmoySG/logsmith-monitor).

## Getting Started

Install LogsmithJS using npm

```shell
npm i logsmithjs
```

Import the `Logsmith` object to use LogsmithJS.

```js
import Logsmith  from "logsmithjs"

const log = new Logsmith({})

log.INFO("this is working fine")
```

## Configurations

To use logsmith, certain configurations are required. If no configs are provided then the default values are set. A basic logsmith config looks something like this.

```json
{
    "env": "test",
    "logfile": "path/to/local/log/file",
    "consoleOnly": false,
    "logStatementPattern": "[ {component} ~ {logLevel} ] : {message}",
    "logFormat": "json",
    "monitorLogging": true
}
```

The Various flags/fields that can be configured are

| Field               | Description                                                                                                                                                                                 | Type    | Allowed Values        | Default Value             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------- | ------------------------- |
| env                 | Environment on which the app is running                                                                                                                                                     | string  | Any                   | "default"                 |
| consoleOnly         | If consoleOnly is set to true then the logs will only be shown on the terminal, and wont be logged to any file                                                                              | boolean | `true` or `false`     | true                      |
| logfile             | If logs are to be logged to a file, this field is used to specify the path to the logfile, works only if consoleOnly is false                                                               | string  | Relative Path to File | null                      |
| logStatementPattern | The Pattern in which the log needs to be logged on console. [Read More.]()                                                                                                                  | string  | Any String            | `[{timestamp}] {message}` |
| logFormat           | The Format of Log                                                                                                                                                                           | string  | `json` or `statement` | json                      |
| monitorLogging      | Flag that is set if logging to monitor is required. If set to true, logs will be published to monitor too. If set to true, monitor specific configurations are also required. [Read More]() | boolean | `true` or `false`     | false                     |
| monitor             | A JSON field that is required to communicate with monitor. Works only is monitorLogging is set to true. Read the [Monitor Config Section]() for more                                        | json    | [Read More]()         | null                      |

### Using Configurations

Configurations can be defined and used in an application by creating the config json and passing it to the Logsmith object while initializing.

```js
import Logsmith  from "logsmithjs"

const logConfig = {
    "env": "test",
    "logfile": "path/to/local/log/file",
    "consoleOnly": false,
    "logStatementPattern": "[ {component} ~ {logLevel} ] : {message}",
    "logFormat": "json",
    "monitorLogging": true
}

const log = new Logsmith(logConfig)
```

Configurations may also be loaded from JSON files. Define the Configurations in a JSON file and load it using `fetchConfigFromFile()` method.

```js
import Logsmith from "logsmithjs"

const log = new Logsmith({});

log.fetchConfigFromFile("/path/to/config/file.json")
```

## Usage

Logsmith JS provides several Log Level based logging methods. It also provides a customizable logging method that can be used to log with a custom log level other than the ones provided. The methods can take both JSON and Statements as valid log.

### log.SUCCESS()

`log.SUCCESS()` can be used to log Successful events and actions. Example:

```js
log.SUCCESS({"test" : "passed"})
log.SUCCESS("The Tests Passed!")
```

### log.INFO()

`log.INFO()` can be used to log Informational messages/prompts. Example:

```js
log.INFO({"status" : "ok"})
log.INFO("The System is OK")
```

### log.WARN()

`log.WARN()` can be used to log Warnings. Example:

```js
log.WARN({"status" : "The system may be Vulnerable"})
log.WARN("The system may be Vulnerable")
```

### log.FAILURE()

`log.FAILURE()` can be used to log Failures. Example:

```js
log.FAILURE({"test" : "failed"})
log.FAILURE("The Tests Failed.")
```

### log.CRITICAL()

`log.CRITICAL()` can be used to log events that may lead to system shutdowns, data loss or other critically fatal events. Example:

```js
log.CRITICAL({"system" : "meltdown"})
log.CRITICAL("The system is Shutting Down.")
```

### log.LOG()

This method provides the custom log level logging capability. This method takes a parameter `loglevel` other than the log itself. The loglevel can be set to any string. Example:

```js
log.LOG(loglevel="TEST", {"test": "passed"})
log.LOG(loglevel="TEST", "The test Passed")
```