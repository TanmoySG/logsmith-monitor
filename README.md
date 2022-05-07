# logsmith-monitor

A stand-alone logging Server for  multi-component apps. Move logging out of your apps and let logsmith-monitor handle and store them for you.

Logsmith-Monitor detaches your App and Logs to give a centralized hassle free logging experience. Different running components of your app that publish logs can dump them into a single central log server - logsmith-monitor, making monitoring across components easier.
<center>
<!-- ![Diagram](./documentation/architecture/diagrams/logsmith-monitor.jpg) -->
Tete
</center>

A Full-Stack app that can publish logs are called "Publisher". An App may comprise of various components - frontend, backend, database, event-processor, etc. that may publish its own logs. Each Component has its own "Context" within the Publisher as a Logical separation. Each Context publishes its logs to The Context's LogRegistry.

![Diagram](./documentation/architecture/diagrams/logsmith-monitor-flow-Page-2.jpg)