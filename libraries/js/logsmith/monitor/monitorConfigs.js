import compile from "string-template/compile.js"

const URITemplate = compile("{0}://{1}:{2}");
const DefaultPublisherTemplate = {
    Origin: compile("app.{0}.com"),
    Description: compile("Logs Published by {0}")
}
const DefaultContextTemplate = {
    Origin: compile("app.{0}.com/{1}"),
    Description: compile("Log Published by {0} to context {1}"),
    Kind: {
        logs: []
    }
}

function formatPublisherConfig(monitorConfig) {
    const publisherConfig = {}
    publisherConfig.publisher = monitorConfig.publisher || process.env.PUBLISHER
    publisherConfig.origin = monitorConfig.origin || DefaultPublisherTemplate.Origin(publisherConfig.publisher)
    publisherConfig.description = monitorConfig.description || DefaultPublisherTemplate.Description(publisherConfig.publisher)
    return publisherConfig
}

function formatCotextConfig(publisher, monitorConfig) {
    const contextConfig = {}
    contextConfig.context = monitorConfig.context || process.env.CONTEXT
    contextConfig.origin = monitorConfig.origin || DefaultContextTemplate.Origin(publisher, contextConfig.context)
    contextConfig.description = monitorConfig.description || DefaultPublisherTemplate.Description(publisher, contextConfig.context)
    contextConfig.kind = monitorConfig.kind || DefaultContextTemplate.Kind
    return contextConfig
}

export function getMonitorConfigs(config) {
    const monitorConfigs = {}
    monitorConfigs.monitorPort = config.monitor.port || process.env.MONITOR_PORT
    monitorConfigs.monitorURI = config.monitor.server || process.env.MONITOR_URI
    monitorConfigs.monitorProtocol = config.monitor.protocol || process.env.MONITOR_PROTOCOL || "http"
    monitorConfigs.monitorListener = URITemplate(monitorConfigs.monitorProtocol, monitorConfigs.monitorURI, monitorConfigs.monitorPort) || process.env.LISTENER
    monitorConfigs.publisher = formatPublisherConfig(config.monitor.publisher)
    monitorConfigs.context = formatCotextConfig(monitorConfigs.publisher.publisher, config.monitor.context)
    return monitorConfigs
}

// can be used for test
// console.log(
//     getMonitorConfigs({
//         monitor: {
//             port: "8080",
//             server: "localhost",
//             publisher: {
//                 publisher: "test"
//             },
//             context: {
//                 context: "testcon"
//             }
//         }
//     })
// )