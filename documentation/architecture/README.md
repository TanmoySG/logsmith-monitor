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
<centre>
<img src="./diagrams/logsmith-monitor-flow.jpg" />
<centre>