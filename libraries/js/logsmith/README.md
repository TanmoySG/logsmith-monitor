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

### Configuration

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

| Field       | Description                                                                                                                   | Type    | Allowed Values        | Default Value |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------- | ------------- |
| env         | Environment on which the app is running                                                                                       | string  | Any                   | "default"     |
| consoleOnly | If consoleOnly is set to true then the logs will only be shown on the terminal, and wont be logged to any file                | boolean | true or false         | true          |
| logfile     | If logs are to be logged to a file, this field is used to specify the path to the logfile, works only if consoleOnly is false | string  | Relative Path to File | null          |
|             |                                                                                                                               |         |                       |               |