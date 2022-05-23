import compile from "string-template/compile.js"
import fetch from 'node-fetch'

const Endpoints = {
    API: compile("{0}/"),
    Publisher: compile("{0}/publisher"),
    Context: compile("{0}/{1}/context"),
    Log: compile("{0}/{1}/{2}/logs")
}


export function logToMonitor(listener, publisher, context, log, callback) {
    const logURI = Endpoints.API(listener)
    fetch(logURI).then(function (response) {
        return response.json()
    }).then(function (response) {
        console.log(response)
    })
}

logToMonitor("http://localhost:8080")