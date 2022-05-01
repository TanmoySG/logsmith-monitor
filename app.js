import express from "express";
import { addToPublisherRegistry, getPublishersRegistry } from "./handlers/publishers/publisher.js";
import { validateExistingPublisher } from "./handlers/publishers/validate.js";
import { addToContextsRegistry } from "./handlers/contexts/context.js";

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", function (request, response) {
    addToContextrRegistry();
    response.send({
        message: "Welcome to Logsmith Monitor!",
        version: "logsmith-monitor v0.1.0"
    })
})

// Documentation Route - for new Publisher
app.get("/publisher/new", function (request, response) {
    response.send({
        greetings: "Welcome to Logsmith Monitor Documentation!",
        message: "Use this route in POST method to register new publisher.",
        route: "{url}:{port}/publisher/new",
        method: "POST",
        body: {
            publisher: "A Recognizable and Short Name of the Publisher, Eg. App1",
            origin: "Origin of the Publisher - Technical Name or URI. Eg. backend.app1.com:5000",
            description: "Description of the Publisher. Eg. The Backend of App1"
        }
    })
})

// Usage Route - for new Publisher
app.post("/publisher/new", function (request, response) {
    const newPublisherRequestProfile = request.body;
    addToPublisherRegistry(newPublisherRequestProfile, function (PublisherRegistryResponse) {
        response.status(PublisherRegistryResponse['status'] == "success" ? 200 : 412);
        response.send(PublisherRegistryResponse);
    });
})


app.get("/:publisher/context/new", function (request, response) {
    const Publisher = request.params["publisher"];
    const PublisherRegistry = getPublishersRegistry();

})


app.get("/publish/logs", function (request, response) {
    response.send({
        message: "Publish Logs Route",
        documentation: {
            context: "Name of Component/App Pushing the Log",
            log: { "doc": "Put a JSON Object with all the logging details" },
            status: "INFO | WARN | SUCCESS | FAILURE | CRITICAL",
            subcontext: "sub.contexts.to.a.context"
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
            subcontext: "subcontexts.to.a.context"
        }
    })
})


app.listen(PORT, function () {
    console.log("Running on http://localhost:" + PORT)
})