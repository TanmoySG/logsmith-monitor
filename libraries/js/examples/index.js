import Logsmith from "../logsmith/logsmith.js";
import express from "express";

const configFilePath = "/workspaces/logsmith-monitor/libraries/js/examples/configs/jsonConfig.json";

const app = express();
const PORT = process.env.PORT || 8096;

const logg = new Logsmith({})
logg.fetchConfigFromFile(configFilePath)
logg.initializeMonitor()

app.use(express.json());

app.get("/warn", function (request, response) {
    logg.WARN({ "trial": "W" })
    response.send({
        message: "Welcome to Logsmith Example!",
        version: "logsmith-monitor v0.1.0-alpha - Example",
        level: "warn"
    })
})

app.get("/info", function (request, response) {
    logg.INFO({ "trial": "I" })
    response.send({
        message: "Welcome to Logsmith Example!",
        version: "logsmith-monitor v0.1.0-alpha - Example",
        level: "info"
    })
})

app.get("/critical", function (request, response) {
    logg.CRITICAL({ "trial": "C" })
    response.send({
        message: "Welcome to Logsmith Example!",
        version: "logsmith-monitor v0.1.0-alpha - Example",
        level: "critical"
    })
})

app.get("/success", function (request, response) {
    logg.SUCCESS({ "trial": "S" })
    response.send({
        message: "Welcome to Logsmith Example!",
        version: "logsmith-monitor v0.1.0-alpha - Example",
        level: "success"
    })
})

app.get("/failure", function (request, response) {
    logg.FAILURE({ "trial": "F" })
    response.send({
        message: "Welcome to Logsmith Example!",
        version: "logsmith-monitor v0.1.0-alpha - Example",
        level: "failure"
    })
})

app.get("/log", function (request, response) {
    logg.LOG("TRAILING...", { "trial": "L" })
    response.send({
        message: "Welcome to Logsmith Example!",
        version: "logsmith-monitor v0.1.0-alpha - Example",
        level: "log"
    })
})

app.listen(PORT, function () {
    console.log("Running on http://localhost:" + PORT)
})