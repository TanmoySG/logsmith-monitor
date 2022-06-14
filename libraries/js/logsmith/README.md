# LogsmithJS

LogsmithJS is a Logging Library for Node JS apps with support for [logsmith-monitor](https://github.com/TanmoySG/logsmith-monitor).

## Getting Started

Install LogsmithJS using npm

```sh
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

| Field               | Description                                                                                                                                                                                 | Type    | Allowed Values                       | Default Value             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------ | ------------------------- |
| env                 | Environment on which the app is running                                                                                                                                                     | string  | Any                                  | "default"                 |
| consoleOnly         | If consoleOnly is set to true then the logs will only be shown on the terminal, and wont be logged to any file                                                                              | boolean | `true` or `false`                    | true                      |
| logfile             | If logs are to be logged to a file, this field is used to specify the path to the logfile, works only if consoleOnly is false                                                               | string  | Relative Path to File                | null                      |
| logStatementPattern | The Pattern in which the log needs to be logged on console. [Read More.](#log-statement-patterns)                                                                                           | string  | Any String                           | `[{timestamp}] {message}` |
| logFormat           | The Format of Log                                                                                                                                                                           | string  | `json` or `statement`                | json                      |
| monitorLogging      | Flag that is set if logging to monitor is required. If set to true, logs will be published to monitor too. If set to true, monitor specific configurations are also required. [Read More]() | boolean | `true` or `false`                    | false                     |
| monitor             | A JSON field that is required to communicate with monitor. Works only is monitorLogging is set to true. Read the [Monitor Config Section](#monitor-configurations) for more                 | json    | [Read More](#monitor-configurations) | null                      |

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

## Support for Logsmith Monitor

Logsmith Monitor (or simply Monitor) is a stand-alone logging Server for multi-component apps. Read about logsmith-monitor [here](https://github.com/TanmoySG/logsmith-monitor).

LogsmithJS supports logging to Monitor. It pro creation of Publishers and Context

### Monitor Configurations

There are some specific connfigurations that are required to log to logsmith monitor. A basic and minimum configuration has the following fields, along with the configurations mentioned above. 

The Configurations for monitor support are defined as a JSON Object with "monitor" as the key.

```json
{
    "monitor": {
        "port": "8080",
        "server": "localhost",
        "publisher": {
            "publisher": "testapp001"
        },
        "context": {
            "context": "testcontext001"
        }
    }
}
```

The fields required for monitor support are

| Fields    | Description                                          | Type         | Allowed Values                |
| --------- | ---------------------------------------------------- | ------------ | ----------------------------- |
| server    | The address/URI where monitor is running             | URI (string) | URL                           |
| port      | The Port of the address where its running            | string       | Numeric and Valid PORT number |
| publisher | A JSON object to define the details of the Publisher | JSON Object  | JSON                          |
| context   | A JSON Object top specify the details of the Context | JSON Object  | JSON                          |

The `publisher` and `context` fields are used to define their respective configs. The bare minimum publisher and context information that must be provided are the namespaces. 

For Publisher Configurations, the field that needs to be put is the publisher name. Eg:
```json
"publisher": {
    "publisher": "<publsiher-name>"
}
```

For Context Configurations, the field that needs to be put is the context name. Eg:
```json
"context": {
    "context": "<context-name>"
}
```

There are other customizable fields for either. These fields are same as that defined for running Monitor. 

- [Read More about the configurations for Publisher](../../../documentation/README.md#register-a-publisher)
- [Read More about the configurations for Contexts](../../../documentation/README.md#register-a-context)

When these values are not mentioned/provided by the user, logsmith creates/generates those for you. So the Configuration Above becomes

```json
"monitorConfigs": {
    "monitorPort": "8080",
    "monitorURI": "localhost",
    "monitorProtocol": "http",
    "monitorListener": "http://localhost:8080",
    "publisher": {
        "publisher": "testapp001",
        "origin": "app.testapp001.com",
        "description": "Logs Published by testapp001"
    },
    "context": {
        "context": "testcontext001",
        "origin": "app.testapp001.com/testcontext001",
        "description": "Logs Published by testapp001",
        "kind": []
    }
}
```

### Initializing Monitor Connection

Logsmith provides a method - `initializeMonitor()`, to initialize a connection with the monitor. The method checks if the Publisher and Context Namespaces are available in monitor and creates them if not. 

```js
const log = new Logsmith({})
log.fetchConfigFromFile("/path/to/file.json")

// initialize Monitor
log.initializeMonitor()
```

## Know More

Some general information about some of the components in logsmithjs.

### Log Statement Patterns

Log Statement Patterns are strings with placeholder that are used to print logs on-to the local console in the same format. The placeholders are identified by the names of the fields (in log) and placeholders names are defined in the string by enclosing them within curly-braces `{}`. 

Example Usage
```js
import Logsmith  from "logsmithjs";

const logStatementPattern = "{timestamp} > {status}"
const log = new Logsmith({logStatementPattern : logStatementPattern})

log.INFO({"timetamp": "11 AM", "status" : "ok", "action": "create"})
```

The above code logs a custom log statement
```
11 AM > ok
```


## Known Issues

There are some issues that we are working on to solve. List of the known issues and their temporary remediation are available [here](./KNOWN_ISSUES.md).
