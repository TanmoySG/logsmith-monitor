import * as filesystem from 'fs';

export function JSONWriterGeneric(filePath, contentToWrite, callback) {
    const jsonifiedContentToWrite = JSON.stringify(contentToWrite, null, 4);
    filesystem.writeFileSync(filePath, jsonifiedContentToWrite)
    callback()
}
