# Notes

## Types of Supported Loggings

Plan is to support 

- message-logs (general purpose/message based logs) | maybe called unstructured logs - doesnt have schema - has message and status - can have random keys to log
- tech-logs (JSON Objects with details that need to be logged) | maybe called structured logs - has schema - has message and status - only schema-matched logs are logged 
- metrics (time taken/space used/etc) | json object of performance and stats
- what else?


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

### Kind Of ...

```
---Publisher#1
  |-- ContextsRegistryForPub#1.json
  |-- Context#1.json
  |-- Context#2.json
  |-- ...
---Publisher#2
  |-- ContextsRegistryForPub#2.json
  |-- Context#1.json
  |-- ...
---Publisher#3
  |-- ContextsRegistryForPub#3.json
  |-- Context#1.json
  |-- ...
-- ...
```
### PublishersRegistry - where List and Details of Publishers are stored
```
{
    "publisher#1" : {
        "id" : "xyzabc123",
        "timestamp" : "12345678",
        "description" : "Lorem Ipsum",
        "path" : "/path/to/pub#1/directory"
    },
    "publisher#2" : {...},
    "publisher#3" : {...},
}
```
### ContextRegistry - where List and Details of Contexts
```
{
    "context#1" : {
        "id" : "123345",
        "timestamp" : "1233",
        "description" : "Lorem Ipsum",
        "usesSchema" : true,
        "schema": {...}
    }
}
```
### LOGS - where logs live - ndjson, maybe, json
```
{
    logs:[
        ...
    ]
}
```

## Log Schema 

```
{
    "key" : {
        "type" : "string",
    }
}

Matches Type, and other Constraints
```
### --- Or ---

```
{
    "key" : "descriptor",
    "key" : "descriptor",
    ...
}

Matches only Keys, if keys are present.
```