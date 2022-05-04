import { registerNewLog } from "./logsHandler/logs.js";
const publisher = "tester";
const context = "test-context";
// const newContext = {
//     "context" : "test-context",
//     "origin" : "app.something.com:1000/context1",
//     "description" : "Lorem Ipsum",
//     "kind" : {
//         "logs" : ["col1","col2"],
//     }  
// }

// addToContextsRegistry(publisher, newContext, function(ret){
//     console.log(ret)
// })

const logg1 = {
    "col1" : "test",
    "col2": "test2",
    "timestamp" : 123456,
    "status" : "WARN"
}

const logg2={
    "col1" : "test",
    "col2": "test2",
    "status" : "WARN"
}

const logg3={
    "col" : "test",
    "col2": "test2",
    "status" : "WARN"
}

registerNewLog(publisher, context,logg1, function (err) {
    console.log(err)
    registerNewLog(publisher, context,logg2, function (err) {
        console.log(err)
        registerNewLog(publisher, context,logg3, function (err) {
            console.log(err)
        })
    });
});





