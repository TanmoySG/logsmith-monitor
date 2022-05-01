import { addToContextsRegistry } from "./contexts/context.js";

const publisher = "tester";
const newContext = {
    "context" : "test-context",
    "origin" : "app.something.com:1000/context1",
    "description" : "Lorem Ipsum",
    "kind" : {
        "logs" : ["col1","col2"],
    }  
}

addToContextsRegistry(publisher, newContext, function(ret){
    console.log(ret)
})