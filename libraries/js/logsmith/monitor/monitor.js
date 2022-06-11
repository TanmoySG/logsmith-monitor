import fetch from 'node-fetch'
import isReachable from 'is-reachable'
import compile from "string-template/compile.js"
import { MonitorResponse } from "../lib/specs.js"

const Endpoints = {
    API: compile("{0}/"),
    Publisher: compile("{0}/publisher"),
    checkPublisher: compile("{0}/{1}"),
    Context: compile("{0}/{1}/context"),
    checkContext: compile("{0}/{1}/{2}"),
    Log: compile("{0}/{1}/{2}/logs")
}

function prepareRequestConfig(method, body) {
    if (method == "POST") {
        return {
            method: method,
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        }
    } else if (method == "GET") {
        return {
            method: method
        }
    }

}

export async function checkConnection(listener) {
    const checkConnectionEndpoint = Endpoints.API(listener)
    const reachablity = await isReachable(checkConnectionEndpoint)
    if (reachablity == true) {
        return true
    } else {
        return false
    }
}

export function createMonitorNamespaces(listener, monitorConfig, callback) {
    const publisher = monitorConfig.publisher
    const context = monitorConfig.context
    checkPublisher(listener, publisher.publisher, function (response) {
        if (response.scope == MonitorResponse.connection.failed) {
            callback(response.message)
        }
        if (response.scope == MonitorResponse.publisher.exists) {
            callback(response.scope)
        } else {
            createNewPublisher(listener, publisher, function (response) {
                if (response.scope == MonitorResponse.publisher.success) {
                    checkContext(listener, publisher, context, function (response) {
                        if (response.scope == MonitorResponse.publisher.exists) {
                            callback(response.scope)
                        } else {
                            createNewContext(listener, publisher, context, function (response) {
                                if (response.scope == MonitorResponse.context.success) {
                                    callback(response.scope)
                                } else {
                                    callback(response.scope)
                                }
                            })
                        }
                    })
                } else {
                    callback(response)
                }
            })
        }
    })
}

export async function checkPublisher(listener, publisher, callback) {
    const checkPublisherURI = Endpoints.checkPublisher(listener, publisher)
    await fetch(checkPublisherURI, prepareRequestConfig("GET", {})).then(function (response) {
        return response.json()
    }).then(function (response) {
        callback(response)
    }).catch((error) => {
        if (error.name == "FetchError") {
            callback({
                scope: MonitorResponse.connection.failed,
                message: "couldn't connect to monitor. Logging offline."
            })
        }
    }).catch(function(error){
        callback(MonitorResponse.connection.failed)
    })
}

export function checkContext(listener, publisher, context, callback) {
    const checkPublisherURI = Endpoints.checkContext(listener, publisher, context)
    fetch(checkPublisherURI, prepareRequestConfig("GET", {})).then(function (response) {
        return response.json()
    }).then(function (response) {
        callback(response)
    }).catch(function(error){
        callback(MonitorResponse.connection.failed)
    })
}

export function createNewPublisher(listener, publisher, callback) {
    const publisherURI = Endpoints.Publisher(listener)
    fetch(publisherURI, prepareRequestConfig("POST", publisher)).then(function (response) {
        return response.json()
    }).then(function (response) {
        callback(response)
    }).catch(function(error){
        callback(MonitorResponse.connection.failed)
    })
}

export function createNewContext(listener, publisher, context, callback) {
    const contextURI = Endpoints.Context(listener, publisher.publisher)
    fetch(contextURI, prepareRequestConfig("POST", context)).then(function (response) {
        return response.json()
    }).then(function (response) {
        callback(response)
    }).catch(function(error){
        callback(MonitorResponse.connection.failed)
    })
}


export function logToMonitor(listener, publisher, context, log, callback) {
    const logURI = Endpoints.Log(listener, publisher.publisher, context.context)
    fetch(logURI, prepareRequestConfig("POST", log)).then(function (response) {
        return response.json()
    }).then(function (response) {
        callback(response)
    }).catch(function(error){
        callback(MonitorResponse.connection.failed)
    })
}

export function monitorLogRunner(listener, monitorConfig, log, callback) {
    const publisher = monitorConfig.publisher
    const context = monitorConfig.context
    logToMonitor(listener, publisher, context, log, function (response) {
        callback(response)
    })
}