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
    - ...
```
### Logsmith Monitor - Namespace
![](./diagrams/logsmith-monitor-flow.jpg)

### Logsmith Monitor - Namespace Architecture
![](./diagrams/logsmith-monitor-flow-Page-2.jpg)