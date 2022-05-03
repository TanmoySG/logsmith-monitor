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

// New Publisher Route
app.post("/publisher", function (request, response) {
    const newPublisherRequestProfile = request.body;
    addToPublisherRegistry(newPublisherRequestProfile, function (PublisherRegistryResponse) {
        response.status(PublisherRegistryResponse['status'] == "success" ? 200 : 412);
        response.send(PublisherRegistryResponse);
    });
})


app.get("/:publisher/context", function (request, response) {
    const Publisher = request.params.publisher;
    const newContextRequestProfile = request.body;
    addToContextsRegistry(Publisher, newContextRequestProfile, function(ContextRegistryResponse){
        response.send(ContextRegistryResponse);
    })
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



app.listen(PORT, function () {
    console.log("Running on http://localhost:" + PORT)
})