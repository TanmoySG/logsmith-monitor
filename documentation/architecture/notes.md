# Notes

## Types of Supported Loggings

Plan is to support 

- message-logs (general purpose/message based logs) | maybe called unstructured logs - doesnt have schema - has message and status - can have random keys to log
- tech-logs (JSON Objects with details that need to be logged) | maybe called structured logs - has schema - has message and status - only schema-matched logs are logged 
- metrics (time taken/space used/etc) | json object of performance and stats
- what else?

- Context-less logs go to default context

### Nomenclature 

- Publisher - The App/Service that is Publishing the Logs
- Context - The Component of the App(Publisher) that is publishing the logs
- Sub-Context - The Sub-Component of the Context Publishing the logs [❌]

Contexts have 
- Schema : property - hasSchema [true or false]
- ID : property - id [a short UUID]

## Logical Separations

- The Publishers (Apps) are Logically Separated - Separate Directories - The Publisher Directory has a Contexts.json file with the details and list of Contexts
- The Contexts have logical Seperation too - Separate JSONs (maybe)
    - The JSONs have two parts - schema , logs (an array of JSONs (ndjson))
- No Separation for Sub Conntexts - lives in the Contexts only
- logs and metrics have separate logical boundaries - inside contexts dir. has both logs.json and metrics.json (or ndjson)

### Kind Of ...

```
--- Publisher#1
    |-- ContextsRegistryForPub#1.json
    |-- Context#1
        |-- logs.json
        |-- metrics.json
    |-- Context#2.json
        |-- logs.json
        |-- metrics.json
    |-- ...
--- Publisher#2
    |-- ContextsRegistryForPub#2.json
    |-- Context#1
        |-- logs.json
        |-- metrics.json
    |-- Context#2.json
        |-- logs.json
        |-- metrics.json
    |-- ...
--- Publisher#3
    |-- ContextsRegistryForPub#3.json
    |-- Context#1
        |-- logs.json
        |-- metrics.json
    |-- Context#2.json
        |-- logs.json
        |-- metrics.json
    |-- ...
-- ...
```
### PublishersRegistry - where List and Details of Publishers are stored
```
{
    "publisher#1" : {
        "id" : "xyzabc123",
        "path" : "/path/to/pub#1/directory",
        "origin" : "app.something.com:1000",
        "timestamp" : "12345678",
        "namespace" : "publisher#1",
        "description" : "Lorem Ipsum"
    },
    "publisher#2" : {...},
    "publisher#3" : {...},
}
```
### ContextRegistry - where List and Details of Contexts
Whats Included in request ? - context(namespace),  description,  origin, kind , if log or metrics use schema then add keys log and metric and value as a json object with {"key" : "descriptor" }.

status ad timestamp are added by default - no need to add those

Do we need descriptors for schema?

#### Request
```
POST /:publisher/context/new

{
        "context" : "context#1",
        "origin" : "app.something.com:1000/context1",
        "description" : "Lorem Ipsum",
        "kind" : [log , metric],
        "logs" : [column1, column2, ...],
        "metrics":[ column1, 2, ...]
}


or 

{
        "context" : "context#1",
        "origin" : "app.something.com:1000/context1",
        "description" : "Lorem Ipsum",
        "kind" : {
            "logs" : [column1, column2, ...], // or incase of no schema logs: []
            "metrics":[ column1, 2, ...] // or incase of no schema metrics: []
        }    
}
```
#### How it looks when processed

`context` ---becomes--> `namespace`
```
{
    "context#1" : {
        "id" : "123345",
        "timestamp" : "1233",
        "description" : "Lorem Ipsum",
        "namespace" : "context#1",
        "origin" : "app.something.com:1000/context1",
        "kind" : [log , metric],
        "logs" : {
            "usesSchema" : true,
            "schema": [..., status[WARN|INFO|etc], timestamp],
            "path" : "path/to/logs"
        },
        "metrics" : {
            "usesSchema" : true,
            "schema": [..., timestamp],
            "path" : "path/to/metrics"
        }
    }
}
```
### LOGS/Metrics - where logs and metrics live - ndjson, maybe, json
```
{ ... }
{ ... }
```

## Schema 

```
{
    "key" : {
        "type" : "string",
    }
}

Matches Type, and other Constraints
```
**Or**

```
{
    "key" : "descriptor",
    "key" : "descriptor",
    ...
}

Matches only Keys, if keys are present.
```

### Going with the latter option

```
Matches only Keys, if keys are present.
```

**Update** Wont use Descriptor, just key-names.
```
Match Keys Only, no Descriptor
```

## Process Flow

1. An App needs to register itself (as a Publisher) onto the logsmith - PublisherRegistry
2. The Context may be created/registered in contextsRegistry
3. Emit Logs/metrics from somewhere. 
4. Check Context 
    - If Context Exists
        - Check if it uses Schema 
        - Compare Schema with Data (if usesSchema=true)
        - Else, No Schema - register
    - if Context Does't Exist
        - Register Context - no schema
        - Register Logs
5. ?


### Can this (logsmith-monitor) be a Logging-as-a-Service (LaaS) ?

What is LaaS? - [Logging as a Service on Wikipedia](https://en.wikipedia.org/wiki/Logging_as_a_service)

(Ideate Later)

### cURL Requests Scratchpad
```
curl --request POST --url localhost:8080/publisher/new --header 'content-type: application/json' --data '{"publisher" : "tester","origin" : "two","description" : "hfbhfbvhfdbvf"}'
```

### Tests

A Snippet on How to Write Tests.


Structure
```
 <Handler-Component> Tests
    Testing Method <method-name>
        Test Case #<N> [ <Success/Failure> Case - <Description> ] [ Should Return <Value> ]
```
Code
```
describe("ContextHandler-Validate Tests", function(){
    describe("Testing Method - validateNewContext()", function(){
        it("Test Case #1 [ Success Case - Valid Context        ] [ Should Return True  ]", function(){
            expect(validateNewContext(validNewContextData.validNewContextOne, TestContextRegistry)).to.equal(true)
        })

        it("Test Case #2 [ Failure Case - Context Exists       ] [ Should Return False ]", function(){
            expect(validateNewContext(invalidNewContextData.invalidNewContextOne, TestContextRegistry)).to.equal(false)
        })

        it("Test Case #3 [ Failure Case - Kind Value Missing   ] [ Should Return False ]", function(){
            expect(validateNewContext(invalidNewContextData.invalidNewContextTwo, TestContextRegistry)).to.equal(false)
        })

        it("Test Case #3 [ Failure Case - Origin Missing       ] [ Should Return False ]", function(){
            expect(validateNewContext(invalidNewContextData.invalidNewContextThree, TestContextRegistry)).to.equal(false)
        })

        it("Test Case #3 [ Failure Case - Invalid Origin Value ] [ Should Return False ]", function(){
            expect(validateNewContext(invalidNewContextData.invalidNewContextThree, TestContextRegistry)).to.equal(false)
        })
    })
})
```

### Schema Rules

Rules that govern logs and metric schema

#### Logs Schema Rules
```
- timestamp, status are put in by default
- If the above are added in the new context defination, logsmith considers it as no-schema, as they are added and populated by the system
- If a log has a schema, its uses strict schema usage, i.e logs with any extra columns or missing columns are not recorded
- Will introduce a useStrictSchema Flag in future to enable and disable it.
- If The publisher emits timestamp, the system generated timestamp is overriden
- No need to  mention timestamp and status for new schema defination
- status :  WARN, INFO, CRITICAL, etc
- timestamp : when log is registered
```

#### Metrics Schema Rules
```
- timestamp is put in by default
- If the above are added in the new context defination, logsmith considers it as no-schema, as they are added and populated by the system
- If a metric has a schema, its uses strict schema usage, i.e metric with any extra columns or missing columns are not recorded
- Will introduce a useStrictSchema Flag in future to enable and disable it.
- If The publisher emits timestamp, the system generated timestamp is overriden
- No need to  mention timestamp for new schema defination
- timestamp : when log is registered
```
### Default/Template LogRegistry

How should the "Template" LogRegistry look like? 
```
{
    "kind" : "logs",
    "hasSchema" : true, // or false
    "schema" : ["col1", "col2","timestamp" , "status"],
    "defaults" : ["timestamp" , "status"],
    "logCount" : 69,
    "logs" :[
        {"timestamp" : 123456789, "status" : "warn", "col1", "col2", ...},
        {"timestamp" : 123456789, "status" : "warn", "col1", "col2", ...},
        {"timestamp" : 123456789, "status" : "warn", "col1", "col2", ...},
        {"timestamp" : 123456789, "status" : "warn", "col1", "col2", ...},
        {"timestamp" : 123456789, "status" : "warn", "col1", "col2", ...},
        ...
    ]
}
```

### Register Log - Request JSON
```
POST: /:publisher/:context/log

{
    "timestamp" : 1234,
    "status" " [INFO | WARN | Etc],
    "col1" : kjgkjh,
    ...
}
```

## Random Brainstorming Ideas - 4th May, 2022 Edition

Been thinking about the beauty of Kubernetes Resource Creation and definition with all the "kinds" and "specifications" in YAML. Trying to recreate something like that would not only be cool but also quite helpful in terms of Usage- standardized structure and well defined, and the flexibility of JSON format.

- Creating a Platform Agnostic Thing
- Replace different names of individual to "namespace"
- Create a Kubernetes inspired Resource Creation in JSON
- Specification for all Configuration for a Namespace

```
FOR REGISTERING PUBLISHER

{
    "kind" : "publisher",
    "namespace" : "publisher-name",
    "spcifications" : {
        "origin" : "origin.app.com",
        "description" : "Lorem Ipsum",
    }
}

FOR CREATING CONTEXT
{
    "kind" : "context",
    "namespace" : "context-name",
    "spcifications" : {
        "origin" : "origin.app.com",
        "description" : "Lorem Ipsum",
        "kinds" : {
            "logs" : ["col1","col2"],
            "metrics" : [col1, col2]
        }  
    }
}

FOR LOG - need more storm in the brain. :)
```
- **[for future]** Use Predefined `Log Levels` - INFO WARN etc.
- **[for future]** Use Threads wherever possible to boost performance. Use Threaded Logging from client using libraries.

### Some Intro that can be used 

A Full-Stack app that can publish logs are called "Publisher". An App may comprise of various components - frontend, backend, database, event-processor, etc. that may publish its own logs. Each Component has its own "Context" within the Publisher as a Logical separation. Each Context publishes its logs to The Context's LogRegistry.


### Running Container interactively to Execute Commands inside container

```
docker exec --interactive logsmith-monitor  /bin/sh
```

This brings up the interactive shell inside the container where you can run the commands.

#### Clean-Up inside Container
```
docker exec logsmith-monitor_logsmithmonitor_1  /bin/sh ./scripts/clean-up.sh
```

#### Endpoints

#### For next Iteration
- [ ] `GET /publisher` Publisher List
- [ ] `GET /:publisher/context` Context List
- [ ] `GET /:publisher/:context/logs?realtime=true` Realtime Log List

### Good Practices
- It is a good practice to pass a single log object to everywhere its required instead of defining it in every file.
```
from SubDirPath import defOne
from SubDirTwo import defTwo

log = log()
defOne(params..., log)
defTwo(params..., log)

log.warn()

// SubDirPath File
def defOne(param, log):
    log.warn()

// SubDirTwo File
def defTwo(param, log):
    log.info()
```

Instead of
```
from SubDirPath import defOne
from SubDirTwo import defTwo

log = log(config)
defOne(params)
defTwo(params)

log.warn()

// SubDirPath File
def defOne(param):
    log = log(config)
    log.warn()

// SubDirTwo File
def defTwo(param):
    log = log(config)
    log.info()
```

#### Install local package in the Directory Example Directory

Go to Example Directory, use `npm install`
```
npm install <path-to-project>

//eg
npm install ../logsmith
```


### Helper Libraries

Some thoughts on helper libraries.

#### NodeJS Helper Library

- Q:  

### Responses - Initial

- Publisher
    - publisher.exists
    - publisher.invalid
    - publisher.success
    - publisher.missing
- Context
    - context.invalid
    - context.success
    - context.exists
    - context.missing
- Log
    - log.success
    - log.error


### For testing monitorLogger

```

const sampleData = {
    listener: "http://localhost:8080",
    publisher: {
        publisher: "testapp1",
        origin: "bend.testapp1.com",
        description: "test App"
    },
    context: {
        context: "testcon2",
        origin: "bend.testcon.con",
        description: "Cotext",
        kind: {
            logs: []
        }
    },
    log: {
        loglevel: "WARN",
        worker: "TEST WrKr",
        random: "txt"
    }
}

monitorLogRunner(sampleData.listener, sampleData.publisher, sampleData.context, sampleData.log, function (response) {
    console.log(response)
})
```

```

function loadInits(monitorLogging, monitorConfigs) {
    if (monitorLogging && monitorConfigs.publisher != undefined && monitorConfigs.context != undefined) {
        createNewPublisher(monitorConfigs.listener, monitorConfigs.publisher, function (res) {
            createNewContext(monitorConfigs.listener, monitorConfigs.publisher, monitorConfigs.context, function (resp) {
                console.log("loded")
            })
        })
    }
}
```

```
if (response.scope == MonitorResponse.publisher.missing) {
            createNewPublisher(listener, publisher, function (response) {
                if (response.scope == MonitorResponse.publisher.success) {
                    monitorLogRunner(listener, monitorConfig, log, function (response) {
                        callback(response)
                    })
                }
                callback(response)
            })
        } else if (response.scope == MonitorResponse.context.missing) {
            createNewContext(listener, publisher, context, function (response) {
                if (response.scope == MonitorResponse.context.success) {
                    monitorLogRunner(listener, monitorConfig, log, function (response) {
                        console.log(response)
                        callback(response)
                    })
                }
                callback(response)
            })
        } else {
            if (response.scope == MonitorResponse.log.error) {
                callback(response)
            } else if (response.scope == MonitorResponse.log.success) {
                callback(response)
            }
        }
```

### Not Reachable Monitor

Identified Issues

- Mid-flight crashing
    - If the Monitor goes down, for any reason , the logging library also causes the app/program its logging for to go down, mid flight.
    - Caused due to FetchError in node-fetchwhen server is unreachable.
    - This should be worked on and rather than making the program stop it should handle it 
    - May add a catch block to handle this
    - **Pending Issue Creation** -  Create an issue and work on it.