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

## Planning

Feature Planning and Delivery Milestones. [Just Impersonating PM Stuff!]

- **Current Dev Version - `0.1.0-alpha`**
- Test Versions - 0.0.x with x taking up 0 to 15 (only 15 test builds allowed)

Features Planned (yet)

[High Level]
- PublisherRegistry
- ContextRegistry
- LogRegistry
- MetricRegistry
- Log Fetching or Log Get
- Containerization, CI/CD and Testing
- Helper Libraries
- Monitoring Dashboard
- Complete `v0.1.0` Routes and Endpoints

[Low Level]
- Context Validation `target: v0.1.0-alpha` `in development`
- Publisher Validation `target: v0.1.0-alpha` `in development`
- Log Validation (schema) `target: v0.1.0-alpha` `in development`
- Strict Schema Usage `backlogged`
- Schema Descriptor, Field Type, and other schema enhancements `backlogged`
- Post-Validation Actions for Publisher Registry `target: v0.1.0-alpha` `in development`
- Post-Validation Actions for Context Registry `target: v0.1.0-alpha` `in development`
- Post-Validation for LogRegistry `target: v0.1.0-alpha` `in development`
- Realtime Log Fetching `backlogged`
- In-time/Static Log Fetching `target: v0.1.0-alpha` `in development`
- Response Standardizer `target: v0.1.0-alpha` `in development`
- Containerization 
- Container Publishing
- Helper Libraries - Python and JS `target: v0.1.0-alpha` `in development`
- Testing - Current Features `target: v0.1.0-alpha` `in development`
- CI/CD Pipelines 
- A Monitoring Dashboard (in Container Dashboard) `backlogged`
- MetricRegistry Schema Validation and Definition `backlogged`
- MetricRegistry Data Visualization in Dashboard `backlogged`
- MetricPipes for Easy Analysis of Metrics `backlogged`
- Pretty Print JSON Logs to Prettified logs `backlogged`
- Logsmith Access Control using Username and Token - Environment Variable based
- Add as Neccessary

| Feature [HL] | Component [LL] | Tracking Issues | Target Version | Milestone |
| ------------ | -------------- | --------------- | -------------- | --------- |
| PublisherRegistry | Publisher Validation,  Post-Validation Actions for Publisher Registry | [#2](https://github.com/TanmoySG/logsmith-monitor/issues/2) [#10](https://github.com/TanmoySG/logsmith-monitor/issues/10) [#13](https://github.com/TanmoySG/logsmith-monitor/issues/13) | v0.1.0-alpha | [logsmith-monitor v0.1.0](https://github.com/TanmoySG/logsmith-monitor/milestone/1) |
| ContextRegistry | Context Validation,  Post-Validation Actions for Context Registry | [#3](https://github.com/TanmoySG/logsmith-monitor/issues/3) [#8](https://github.com/TanmoySG/logsmith-monitor/issues/8) [#12](https://github.com/TanmoySG/logsmith-monitor/issues/12) | v0.1.0-alpha | [logsmith-monitor v0.1.0](https://github.com/TanmoySG/logsmith-monitor/milestone/1) |
| LogRegistry | Log Validation (schema), Post-Validation for LogRegistry | [#6](https://github.com/TanmoySG/logsmith-monitor/issues/6) [#14](https://github.com/TanmoySG/logsmith-monitor/issues/14) [#15](https://github.com/TanmoySG/logsmith-monitor/issues/15) | v0.1.0-alpha | [logsmith-monitor v0.1.0](https://github.com/TanmoySG/logsmith-monitor/milestone/1) |
| Helper Libraries | Helper Libraries - Python and JS | |  | v0.1.0-alpha | [logsmith-monitor v0.1.0 - Helper Libraries](https://github.com/TanmoySG/logsmith-monitor/milestone/2) |
| Log Fetching or Log Get | In-time/Static Log Fetching | [#16](https://github.com/TanmoySG/logsmith-monitor/issues/16) [#17](https://github.com/TanmoySG/logsmith-monitor/issues/17) | v0.1.0-alpha | [logsmith-monitor v0.1.0](https://github.com/TanmoySG/logsmith-monitor/milestone/1) |
| Containerization, CI/CD and Testing | Testing - Current Features, Containerization, CI/CD Pipelines  | [#9](https://github.com/TanmoySG/logsmith-monitor/issues/9) | v0.1.0-alpha | [logsmith-monitor v0.1.0](https://github.com/TanmoySG/logsmith-monitor/milestone/1) |
| Monitoring Dashboard | | | backlogged | |
| MetricRegistry | MetricRegistry Schema Validation and Definition | [#7](https://github.com/TanmoySG/logsmith-monitor/issues/7) |  backlogged | |
| Log Fetching or Log Get | Realtime LogFetch | [#18](https://github.com/TanmoySG/logsmith-monitor/issues/18) |  backlogged | |
| Complete `v0.1.0` Routes and Endpoints | TBD | | v0.1.0-alpha | [logsmith-monitor v0.1.0](https://github.com/TanmoySG/logsmith-monitor/milestone/1) |