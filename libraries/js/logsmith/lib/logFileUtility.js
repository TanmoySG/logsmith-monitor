import * as filesystem from 'fs'
import ndjson from 'ndjson'

function createLogFileIfNotExists(filepath) {
    filesystem.writeFileSync(filepath, "", function (err) {
        if (err) console.error(err);
    })
}

// To Do: add try-catch block and callback(err) on failure
export function writeLogToFile(log, filepath, consoleOnly) {
    if (consoleOnly) {
        return
    }
    if (!filesystem.existsSync(filepath)) {
        createLogFileIfNotExists(filepath)
    }
    const stream = ndjson.stringify()
    stream.on('data', function (logline) {
        filesystem.appendFileSync(filepath, logline);
    })
    stream.write(log)
    stream.end()
}

export function writeLogToFileOnExit(logs, filepath, consoleOnly) {
    if (consoleOnly) {
        return
    }
    if (!filesystem.existsSync(filepath)) {
        createLogFileIfNotExists(filepath)
    }
    const stream = ndjson.stringify()
    stream.on('data', function (logline) {
        filesystem.appendFileSync(filepath, logline);
    })
    logs.forEach(logline => {
        stream.write(logline)
    });
    stream.end()
}