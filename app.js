import express from "express";
import { addToPublisherRegistry } from "./handlers/publishers/publisher.js";
import { addToContextsRegistry } from "./handlers/contexts/context.js";
import { registerNewLog } from "./handlers/logsHandler/logs.js";
import { ResponseStandardizer } from "./handlers/utilities/responseUtility.js";

const app = express();
const PORT = 9059;

app.use(express.json());

app.get("/", function (request, response) {
    response.send({
        message: "Welcome to Logsmith Monitor!",
        version: "logsmith-monitor v0.1.0"
    })
})

// New Publisher Route
app.post("/publisher", function (request, response) {
    const newPublisherRequestProfile = request.body;
    addToPublisherRegistry(newPublisherRequestProfile, function (PublisherRegistryResponse) {
        ResponseStandardizer(PublisherRegistryResponse, function(StatusCode, ResponseBody){
            response.status(StatusCode)
            response.send(ResponseBody)
        })
    });
})

// New Context Route
app.post("/:publisher/context", function (request, response) {
    const Publisher = request.params.publisher;
    const newContextRequestProfile = request.body;
    addToContextsRegistry(Publisher, newContextRequestProfile, function (ContextRegistryResponse) {
        response.send(ContextRegistryResponse);
    })
})

// Publish Log Route
app.post("/:publisher/:context/logs", function (request, response) {
    const Publisher = request.params.publisher;
    const Context = request.params.context;
    const newLog = request.body;
    registerNewLog(Publisher, Context, newLog, function (LogRegistryResponse) {
        response.send(LogRegistryResponse)
    })
})

// Server Defination
app.listen(PORT, function () {
    console.log("Running on http://localhost:" + PORT)
})