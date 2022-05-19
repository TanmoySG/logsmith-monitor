
# LogSmith Planning

Feature Planning and Delivery Milestones. [Just Impersonating PM Stuff!]

- **Current Dev Version - `0.1.0-alpha`**
- Test Versions - 0.0.x with x taking up 0 to 15 (only 15 test builds allowed)

#### Current Development [v0.1.0] Project Board

- [logsmith-monitor v0.1.0-alpha Release](https://github.com/TanmoySG/logsmith-monitor/projects/1)


| Feature [HL] | Component [LL] | Tracking Issues | Target Version | Milestone |
| ------------ | -------------- | --------------- | -------------- | --------- |
| PublisherRegistry | Publisher Validation,  Post-Validation Actions for Publisher Registry | [#2](https://github.com/TanmoySG/logsmith-monitor/issues/2) [#10](https://github.com/TanmoySG/logsmith-monitor/issues/10) [#13](https://github.com/TanmoySG/logsmith-monitor/issues/13) | v0.1.0-alpha | [logsmith-monitor v0.1.0](https://github.com/TanmoySG/logsmith-monitor/milestone/1) |
| ContextRegistry | Context Validation,  Post-Validation Actions for Context Registry | [#3](https://github.com/TanmoySG/logsmith-monitor/issues/3) [#8](https://github.com/TanmoySG/logsmith-monitor/issues/8) [#12](https://github.com/TanmoySG/logsmith-monitor/issues/12) | v0.1.0-alpha | [logsmith-monitor v0.1.0](https://github.com/TanmoySG/logsmith-monitor/milestone/1) |
| LogRegistry | Log Validation (schema), Post-Validation for LogRegistry | [#6](https://github.com/TanmoySG/logsmith-monitor/issues/6) [#14](https://github.com/TanmoySG/logsmith-monitor/issues/14) [#15](https://github.com/TanmoySG/logsmith-monitor/issues/15) | v0.1.0-alpha | [logsmith-monitor v0.1.0](https://github.com/TanmoySG/logsmith-monitor/milestone/1) |
| Helper Libraries | Helper Libraries - Python and JS | |  v0.1.0-alpha | [logsmith-monitor v0.1.0 - Helper Libraries](https://github.com/TanmoySG/logsmith-monitor/milestone/2) |
| Log Fetching or Log Get | In-time/Static Log Fetching | [#16](https://github.com/TanmoySG/logsmith-monitor/issues/16) [#17](https://github.com/TanmoySG/logsmith-monitor/issues/17) | v0.1.0-alpha | [logsmith-monitor v0.1.0](https://github.com/TanmoySG/logsmith-monitor/milestone/1) |
| Containerization, CI/CD and Testing | Testing - Current Features, Containerization, CI/CD Pipelines  | [#9](https://github.com/TanmoySG/logsmith-monitor/issues/9) | v0.1.0-alpha | [logsmith-monitor v0.1.0](https://github.com/TanmoySG/logsmith-monitor/milestone/1) |
| Complete `v0.1.0` Routes and Endpoints | TBD | | v0.1.0-alpha | [logsmith-monitor v0.1.0](https://github.com/TanmoySG/logsmith-monitor/milestone/1) |
| Monitoring Dashboard | | | backlogged | |
| MetricRegistry | MetricRegistry Schema Validation and Definition | [#7](https://github.com/TanmoySG/logsmith-monitor/issues/7) |  backlogged | |
| Log Fetching or Log Get | Realtime LogFetch | [#18](https://github.com/TanmoySG/logsmith-monitor/issues/18) |  backlogged | |


## Features

Features currently in Pipeline for Development.

### Feature Planning

Adding only new feature descriptions here. Existing Developed and Planned Features are in the next section.

- **Log Audit**
    - Log Auditing allows the publisher and logging-server to compare logs between themselves
        - Find anomalies in the logs
        - Sync missing logs, incomplete logs between clients
        - Kinda "Auditing" hence, Log Audit
    - Use Case
        - In Cases, when the log-publisher app/service can't connect to the logsmith servers, it stores the log on the app's end. These logs may not be synced by itself to the server.
        - Also, if on the publisher end, log is not registered, due to any issue, log is registered only on the server side.
- **[Helper Library ~ NodeJS] JSON Logs, Statement Logs and Log Statement Patterns** `[inWork - v0.1.0]`
    - JSON logs are used to produce a log. A JSON object with the Key-Value pair of LogHeader(?) and LogValue is passed to the logger Object.
        - This JSON is used in both JSON and Statement logging. 
        - The Log JSON object is logged/console.log'ed by the logger along with the log level as `[level] {log}`
        - Timestamp, environment (if defined) and loglevel are added to the log JSON object by the logger. As `{timestamp, env, level, ...log}`
    - Statement Logs are used to produce a String Statement based Log
        - It too requires a log json to be passed to the logger
        - The log object uses a `log pattern` defined in the logger config. 
        - Variables/Placeholders are defined in the pattern within `{}`.
            - Eg. `{varone} @ {var2}` , varone and var2 being the placeholders/variables
        - The value of variable are picked up from the JSON Log Object passed. 
        - The keys in pattern must match the keys in the log json
        - This way, the logged JSON is console.log'ed as a statement
    - Sometimes, a User might just want to put a statement in the log object for logging instead of a JSON.
        - In that case the log object should "convert" this statement into a valid JSON
        - The Statement is assiged to a "message" key. Eg.
            - Eg: if "this statement" is passed into the log.INFO() method 
            - it should be converted into {message : "this statement"}
        - Also The default pattern should be able to use this feature, so that when a user puts a statement-log the message key is present in the default print patter
            - Eg. defaultPattern = "{timestamp} ~ {message}
- **[Helper Library ~ NodeJS] `LogConstants` are special log field that the user/dev defines in the log configuration.**
    - These are added to the log produced, by default.
    - Like timestamp, loglevel and env, LogConstants can be used to put constant fields that might be helpful for a user to analyze the logs or other operations, without explicitly putting them in the log.Objects (log.INFO(), .WARN())
    - The user can just put the logging statement/json based on the requirement and these constant fields are put in by the logsmith system.
    - Use Cases :
        - Maybe to define the log component
        - Testing Environment Specs, etc.
- **Console Logging inside Monitor Log**
    - When new logs are published they should be logged onto the server console too
    - Currently the Console logs only "Running at localhost:8080"
    - It Should also print the incoming logs
        - Like `context @ publisher | {incoming log}` 


#### Features Planned (yet)

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
- Post-Validation Actions for Publisher Registry `target: v0.1.0-alpha` `in development`
- Post-Validation Actions for Context Registry `target: v0.1.0-alpha` `in development`
- Post-Validation for LogRegistry `target: v0.1.0-alpha` `in development`
- In-time/Static Log Fetching `target: v0.1.0-alpha` `in development`
- Response Standardizer `target: v0.1.0-alpha` `in development`
- Containerization `target: v0.1.0-alpha` `in development`
- Container Publishing `target: v0.1.0-alpha` `in development`
- Helper Libraries - Python and JS `target: v0.1.0-alpha` `in development`
- Testing - Current Features `target: v0.1.0-alpha` `in development`
- CI/CD Pipelines `target: v0.1.0-alpha` `in development`
- Strict Schema Usage `backlogged`
- Realtime Log Fetching `backlogged`
- Schema Descriptor, Field Type, and other schema enhancements `backlogged`
- A Monitoring Dashboard (in Container Dashboard) `backlogged`
- MetricRegistry Schema Validation and Definition `backlogged`
- MetricRegistry Data Visualization in Dashboard `backlogged`
- MetricPipes for Easy Analysis of Metrics `backlogged`
- Pretty Print JSON Logs to Prettified logs `backlogged`
- Logsmith Access Control using Username and Token - Environment Variable based
- Add as Neccessary
