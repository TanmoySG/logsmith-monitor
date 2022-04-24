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

// jsonlWriter("test.jsonl", {"test" : "succcess", "something" : "nothing"}, function(err){console.log(err)})
// jsonlWriter("test.jsonl", {"test2" : "succcess", "somethin1g" : "nothing"}, function(err){console.log(err)})
// jsonlWriter("test.jsonl", {"test3" : "succcess", "something1" : "nothing"}, function(err){console.log(err)})

// jsonlReader("test.jsonl", (data)=>{console.log(data)})