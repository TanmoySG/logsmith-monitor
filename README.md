# logsmith-monitor

A stand-alone logging Server for  multi-component apps. Move logging out of your apps and let logsmith-monitor handle and store them for you.

Logsmith-Monitor lets you detache your Apps and Logs to give a hassle free logging experience. Different running components of your app that publish logs can push them into a central logging server - logsmith-monitor, making monitoring across components easier.

<div align="center">
<img src="./documentation/architecture/diagrams/logsmith-monitor.jpg" style="width: 50%" />
</div>

## Getting Started

To get started with logsmith-monitor, clone this repo and install the dependancies. Once the dependancies are in place, Run the Express Server

```
node app.js
```

Docker based deployment will be added soon for easy start-up. Read for more options and configurations [here](./documentation/README.md).

## Usage

An App can interact with the logsmith-monitor server using REST Endpoint. To see how to use the REST Endpoints and call them, see the [documentation.](./documentation/README.md)

JavaScript and Python Wrappers over these Endpoints are in the Dev Pipeline for easier usage in projects. These Wrappers will act help in both local logging as well as to interact with logsmith-monitor Server.


## Architecture

Logsmith-Monitor Consists of three main Components - PublisherRegistry, ContextRegistry and LogRegistry. 
- PublisherRegistry stores the information about the Publishers.
- For Each Publisher, a ContextRegistry stores the list and details of Contexts.
- For Each Context, a LogRegistry stores the Logs and the Schema of Logs.

![Diagram](./documentation/architecture/diagrams/logsmith-monitor-flow-Page-2.jpg)

Refer to the [Architectural Documentation](./documentation/architecture/README.md) for detailed information of logsmith-monitor's architecture.

Please Note, Logsmith-monitor is still **Work in Progress** and hence may be rough on the edges.

## Helper Libraries

To ease the usage of monitor in programs, we've also created and published helper logging libraries that can also interact with monitor.

[Python Helper Library - **Logsmith v0.1.0**]
- Documentation - https://pypi.org/project/logsmith/
- PyPi Package - https://pypi.org/project/logsmith/

[NodeJS Helper Library - **LogsmithJS v0.0.4**]
- Documentation - https://github.com/TanmoySG/logsmith-monitor/tree/main/libraries/js/logsmith#readme
- NPM Package - https://www.npmjs.com/package/logsmithjs

Helper libraries for more Languages will be developed soon!

## Testing and Demo

To test logsmith-monitor using sample data, refer to the [Testing Documentation](./test/README.md)

## Some Useful Links

These Links may help you understand, upcoming features, architectural finding and other information about Logsmith Monitor.

- [Notes - where ideas and thoughts are dumped!](./documentation/architecture/notes.md)
- [Planning Documentation - Upcoming Features and Dev Milestones](./documentation/architecture/planning.md)
- [Release Strategy - from wunder-identity-provider](https://github.com/TanmoySG/wunder-identity-provider/issues/79)