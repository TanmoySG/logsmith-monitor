# Documentation

Follow this Documentation to Run and Use Logsmith Monitor to Publish Logs.

## Getting Started

Logsmith Monitor is Built with Node.JS and Express. Install all dependancies

```
npm install
```

Run the Server

```
node .

// or

node app.js
```

This shall start the Server on `localhost:8080` . To use a different PORT, export it and run the server.

```
export PORT=8082
node .
```

## Register a Publisher

For each App that you need to publish logs for, register a publisher using cURL.

```
ENDPOINT: localhost:8080/publisher
METHOD  : POST
PAYLOAD : 
    {
        "publisher"   : "app.name", 
        "origin"      : "app.test.com" , 
        "description" : "Test App"
    }
```

This creates a Publisher Namespace with `ContextRegistry`.

## Register a Context

For each Component of the Publisher App - Frontend/Backend/Services , register a Context.
```
ENDPOINT: localhost:8080/{publisher-name}/context
METHOD  : POST
PAYLOAD : 
    {
        "context": "context.name", 
        "origin": "app.test.com/context", 
        "description": "Test Context", 
        "kind": {
            "logs": ["column1", "column2"]
        }
    }
```
