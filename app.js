import express from "express";

const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", function (request, response) {
    response.send({
        message: "Welcome to Logsmith Monitor!"
    })
})

app.get("/publish/logs", function (request, response) {
    response.send({
        message: "Publish Logs Route",
        documentation: {
            context: "Name of Component/App Pushing the Log",
            log: { "doc": "Put a JSON Object with all the logging details" },
            status: "INFO | WARN | SUCCESS | FAILURE | CRITICAL",
            subcontext : "sub.cotexts.to.a.context"
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