import Logsmith from "../logsmith/logsmith.js";
import express from "express";

const configFilePath = "/workspaces/logsmith-monitor/libraries/js/examples/configs/jsonConfig.json";

const app = express();
const PORT = process.env.PORT || 8096;

const logg = new Logsmith({})
logg.fetchConfigFromFile(configFilePath)
logg.initializeMonitor()

const SampleValidLogExt = {
    "source": "example",
    "issue": "none"
}

app.use(express.json());

app.get("/warn", function (request, response) {
    logg.WARN({ "trial": "W", ...SampleValidLogExt })
    response.send({
        "log": "sent",
        "level": "warn"
    })
})

app.get("/info", function (request, response) {
    logg.INFO({ ...SampleValidLogExt })
    response.send({
        "log": "sent",
        "level": "info"
    })
})

app.get("/critical", function (request, response) {
    logg.CRITICAL({ "trial": "C" })
    response.send({
        "log": "sent",
        "level": "critical"
    })
})

app.get("/success", function (request, response) {
    logg.SUCCESS({ "trial": "S" })
    response.send({
        "log": "sent",
        "level": "success"
    })
})

app.get("/failure", function (request, response) {
    logg.FAILURE({ "trial": "F" })
    response.send({
        "log": "sent",
        "level": "failure"
    })
})

app.get("/log", function (request, response) {
    logg.LOG("TRAILING...", { "trial": "L" })
    response.send({
        "log": "sent",
        "level": "log"
    })
})

app.listen(PORT, function () {
    console.log("Running on http://localhost:" + PORT)
})