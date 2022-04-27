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
- Sub-Context - The Sub-Component of the Context Publishing the logs

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

A Snippent on How to Write Tests.


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