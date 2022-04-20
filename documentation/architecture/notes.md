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
