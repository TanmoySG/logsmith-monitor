# logsmith-monitor

A stand-alone logging Server for  multi-component apps. Move logging out of your apps and let logsmith-monitor handle and store them for you.

Logsmith-Monitor detaches your App and Logs to give a centralized hassle free logging experience. Different running components of your app that publish logs can dump them into a single central log server - logsmith-monitor, making monitoring across components easier.

<div align="center">
<img src="./documentation/architecture/diagrams/logsmith-monitor.jpg" />
</div>

## Getting Started

To get started with logsmith-monitor, clone this repo and install the dependancies using `npm install`. Once the dependancies are in place, Run the Express Server
```
node .
```

Docker based deployment solution to be added soon for easy start-up.

Read for more options and configurations [here](./documentation/README.md).