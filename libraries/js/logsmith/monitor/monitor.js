import compile from "string-template/compile.js"
import fetch from 'node-fetch'
import { MonitorResponse } from "../lib/specs.js"

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

export function createNewPublisher(listener, publisher, callback) {
    const publisherURI = Endpoints.Publisher(listener)
    fetch(publisherURI, prepareRequestConfig("POST", publisher)).then(function (response) {
        return response.json()
    }).then(function (response) {
        callback(response)
    })
}

export function createNewContext(listener, publisher, context, callback) {
    const contextURI = Endpoints.Context(listener, publisher.publisher)
    fetch(contextURI, prepareRequestConfig("POST", context)).then(function (response) {
        return response.json()
    }).then(function (response) {
        callback(response)
    })
}


export function logToMonitor(listener, publisher, context, log, callback) {
    const logURI = Endpoints.Log(listener, publisher.publisher, context.context)
    fetch(logURI, prepareRequestConfig("POST", log)).then(function (response) {
        return response.json()
    }).then(function (response) {
        callback(response)
    })
}

export function monitorLogger(listener, publisher, context, log, callback) {
    logToMonitor(listener, publisher, context, log, function (response) {
        if (response.scope == MonitorResponse.publisher.missing) {
            createNewPublisher(listener, publisher, function (response) {
                if (response.scope == MonitorResponse.publisher.success) {
                    monitorLogger(listener, publisher, context, log, function (response) {
                        callback(response)
                    })
                }
                callback(response)
            })
        } else if (response.scope == MonitorResponse.context.missing) {
            createNewContext(listener, publisher, context, function (response) {
                if (response.scope == MonitorResponse.context.success) {
                    monitorLogger(listener, publisher, context, log, function (response) {
                        callback(response)
                    })
                }
                callback(response)
            })
        } else {
            if (response.scope == MonitorResponse.log.error) {
                // Add Logic
            } else if (response.scope == MonitorResponse.log.success) {
                callback(response)
            }
        }
    })
}

const sampleData = {
    listener: "http://localhost:8080",
    publisher: {
        publisher: "testapp1",
        origin: "bend.testapp1.com",
        description: "test App"
    },
    context: {
        context: "testcon1",
        origin: "bend.testcon.con",
        description: "Cotext",
        kind: {
            logs: []
        }
    },
    log: {
        loglevel: "WARN",
        worker: "TEST WrKr"
    }
}

monitorLogger(sampleData.listener, sampleData.publisher, sampleData.context, sampleData.log, function (response) {
    console.log(response)
})
