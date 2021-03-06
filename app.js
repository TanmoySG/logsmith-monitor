import express from "express";
import { addToPublisherRegistry, verifyPublisherExistence } from "./handlers/publishers/publisher.js";
import { addToContextsRegistry, verifyContextExistence } from "./handlers/contexts/context.js";
import { registerNewLog, getLogs } from "./handlers/logsHandler/logs.js";
import { ResponseStandardizer } from "./handlers/utilities/responseUtility.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", function (request, response) {
    response.send({
        message: "Welcome to Logsmith Monitor!",
        version: "logsmith-monitor v0.1.0-alpha"
    })
})

// New Publisher Route
app.post("/publisher", function (request, response) {
    const newPublisherRequestProfile = request.body;
    addToPublisherRegistry(newPublisherRequestProfile, function (PublisherRegistryResponse) {
        ResponseStandardizer(PublisherRegistryResponse, function (StatusCode, ResponseBody) {
            response.status(StatusCode)
            response.send(ResponseBody)
        })
    });
})

// check publisher 
app.get("/:publisher", function (request, response) {
    const Publisher = request.params.publisher;
    verifyPublisherExistence(Publisher, function (PublisherRegistryResponse) {
        ResponseStandardizer(PublisherRegistryResponse, function (StatusCode, ResponseBody) {
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
        ResponseStandardizer(ContextRegistryResponse, function (StatusCode, ResponseBody) {
            response.status(StatusCode)
            response.send(ResponseBody)
        })
    })
})

// check context 
app.get("/:publisher/:context", function (request, response) {
    const Publisher = request.params.publisher;
    const Context = request.params.context;
    verifyContextExistence(Publisher, Context, function (PublisherRegistryResponse) {
        ResponseStandardizer(PublisherRegistryResponse, function (StatusCode, ResponseBody) {
            response.status(StatusCode)
            response.send(ResponseBody)
        })
    });
})

// Publish Log Route
app.post("/:publisher/:context/logs", function (request, response) {
    const Publisher = request.params.publisher;
    const Context = request.params.context;
    const newLog = request.body;
    registerNewLog(Publisher, Context, newLog, function (LogRegistryResponse) {
        ResponseStandardizer(LogRegistryResponse, function (StatusCode, ResponseBody) {
            response.status(StatusCode)
            response.send(ResponseBody)
        })
    })
})

// Get Logs Route
app.get("/:publisher/:context/logs", function (request, response) {
    const Publisher = request.params.publisher;
    const Context = request.params.context;
    getLogs(Publisher, Context, function (LogRegistryResponse) {
        ResponseStandardizer(LogRegistryResponse, function (StatusCode, ResponseBody) {
            response.status(StatusCode)
            response.send(ResponseBody)
        })
    })
})

// Server Defination
app.listen(PORT, function () {
    console.log("Running on http://localhost:" + PORT)
})