# Logsmith Testing Documentation

Unit Testing for Logsmith are enables by Mocha and Chai. 

Run the Tests
```
npm run test
```


# REST Scripts for Testing Endpoints 

Uses REST Client VSCode Extention. [Link](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

Make sure the PORT value is set correctly in the RESTSnippets.rest file

To Run a Request Click on the `Send Request` Button.

![diagram](../documentation/architecture/diagrams/REST-Client-HOWTO.png)

# Clean-Up 

After running through the demo/test clean-up the sample data using
```
make clean-up
```