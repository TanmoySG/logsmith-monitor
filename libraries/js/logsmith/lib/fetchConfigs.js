import * as filesystem from 'fs';

function readJSONConfig(filepath) {
    const config = JSON.parse(
        filesystem.readFileSync(filepath)
    );
    return config;
}

export function readConfigFile(filetype, filepath) {
    if(filetype=="json"){
        const configs = readJSONConfig(filepath)
        return configs.env , configs.logfile, configs.consoleOnly, configs.logPrintPattern
    }
}