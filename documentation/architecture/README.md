# logsmith-monitor Architecture

Logsmith-Monitor has different layers of Extractions 
```
- PublisherRegistry
    - Publisher
        - ContextRegistry
            - Context
                - logsRegistry
                - metricsRegistry
            - Context
                - logsRegistry
                - metricsRegistry
            - ...
    - Publisher
        - ...
    - Publisher
        - ...
```
<img src="./diagrams/logsmith-monitor-flow.jpg" width="100%"/>
