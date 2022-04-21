import express from "express";
import { addToPublisherRegistry } from "./handlers/publishers/publisher.js";

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", function (request, response) {
    response.send({
        message: "Welcome to Logsmith Monitor!",
        isValid: JSON.stringify(addToPublisherRegistry({
            "publisher" : "tester",
            "description" : "Fucl"
        }))
    })
})


app.get("/publisher/new", function (request, response) {
    response.send({
        greetings: "Welcome to Logsmith Monitor Documentation!",
        message: "Use this route in POST method to register new publisher.",
        route : "{url}:{port}/publisher/new",
        method : "POST",
        body: {
            publisher : "A Recognizable and Short Name of the Publisher, Eg. App1",
            origin : "Origin of the Publisher - Technical Name or URI. Eg. backend.app1.com:5000",
            description : "Description of the Publisher. Eg. The Backend of App1"
        }
    })
})


app.post("/publisher/new", function (request, response) {
    // const newPublisherRequestProfile = request.body;
    addToPublisherRegistry(request.body, function(PublisherRegistryResponse){
        response.status(PublisherRegistryResponse['status'] == "success" ? 200 : 412 );
        response.send(PublisherRegistryResponse);
    });
})

app.get("/publish/logs", function (request, response) {
    response.send({
        message: "Publish Logs Route",
        documentation: {
            context: "Name of Component/App Pushing the Log",
            log: { "doc": "Put a JSON Object with all the logging details" },
            status: "INFO | WARN | SUCCESS | FAILURE | CRITICAL",
            subcontext : "sub.contexts.to.a.context"
        }
    })
})

app.post("/publish/logs", function (request, response) {
    response.send({
        message: "Publish Logs Route",
        documentation: {
            context: "component.context.state",
            log: { "doc": "Put a JSON Object with all the logging details" },
            status: "INFO | WARN | SUCCESS | FAILURE | CRITICAL",
            message: "Overview of the Log",
            subcontext : "subcontexts.to.a.context"
        }
    })
})


app.listen(PORT, function () {
    console.log("Running on http://localhost:" + PORT)
})