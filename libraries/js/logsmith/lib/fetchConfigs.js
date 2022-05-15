import * as filesystem from 'fs';

export function readJSONConfig(filepath, callback) {
    const config = JSON.parse(
        filesystem.readFileSync(filepath)
    );
    return config;
}

export function readConfigFile(filetype, filepath) {
    if (filetype == "json") {
        const configs = readJSONConfig(filepath)
        return configs
    } else if (filetype == "") { }
}