import * as filesystem from 'fs';

export function JSONWriterGeneric(filePath, contentToWrite, callback) {
    const jsonifiedContentToWrite = JSON.stringify(contentToWrite, null, 4);
    filesystem.writeFile(filePath, jsonifiedContentToWrite, function (err) {
        if (err) {
            callback(err);
        }else{
            callback();
        }
    })
}
