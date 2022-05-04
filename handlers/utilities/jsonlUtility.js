import * as filesystem from 'fs';
import { jsonl } from 'js-jsonl';

export function jsonlReader(filePath, callback){
    const jsonlParsedData = jsonl.parse(
        filesystem.readFileSync(filePath)
    );
    callback(jsonlParsedData);
}

export function jsonlWriter(filePath, contentToWrite, callback){
    const jsonlifiedContentToWrite = jsonl.stringify(contentToWrite);
    filesystem.writeFile(filePath, jsonlifiedContentToWrite, function (err) {
        if (err) {
            callback(err);
        }else{
            callback(true);
        }
    })
}