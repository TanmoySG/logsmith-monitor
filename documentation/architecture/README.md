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

![Diagram](./diagrams/logsmith-monitor-flow.jpg)