import compile from "string-template/compile.js"
import fetch from 'node-fetch'

const Endpoints = {
    API: compile("{0}/"),
    Publisher: compile("{0}/publisher"),
    Context: compile("{0}/{1}/context"),
    Log: compile("{0}/{1}/{2}/logs")
}

function prepareRequestConfig(method, body) {
    return {
        method: method,
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    }
}

export function logToMonitor(listener, publisher, context, log, callback) {
    const logURI = Endpoints.Log(listener, publisher, context)
    fetch(logURI, prepareRequestConfig("POST", log)).then(function (response) {
        return response.json()
    }).then(function (response) {
        console.log(response)
    })
}

logToMonitor("http://localhost:8080", "testapp001", "testcontext001", {
    "logLevel": "INFO",
    "message": "Testing Logsmith",
    "mode": "RESTClient"
})

// console.log(prepareRequestConfig("POST", { "test": "pass" }))