import { expect } from "chai";

import { validateNewContext } from "../handlers/contexts/validate.js";

const TestContextRegistry = {
    "context#1": {},
    "context#2": {}
}

const validNewContextData = {
    validNewContextOne: {
        "context": "context#3",
        "origin": "test.context.handler:1000/context#3",
        "description": "Test Context - Test #3",
        "kind": {
            "logs": ["column1", "column2"],
            "metrics": ["column1"]
        }
    }
}

const invalidNewContextData = {
    invalidNewContextOne: {
        "context": "context#1",
        "origin": "test.context.handler:1000/context#1",
        "description": "Test Context - Test #1",
        "kind": {
            "logs": [],
            "metrics": []
        }
    },
    invalidNewContextTwo : {
        "context": "context#3",
        "origin": "test.context.handler:1000/context#3",
        "description": "Test Context - Test #3",
        "kind": {}
    },
    invalidNewContextThree : {
        "context": "context#3",
        "description": "Test Context - Test #3",
        "kind": {}
    },
    invalidNewContextThree : {
        "context": "context#3",
        "origin": "",
        "description": "Test Context - Test #3",
        "kind": {}
    }
}

// ContextHandler - Validation Check - Tests
describe("ContextHandler-Validate Tests", function(){
    describe("Testing Method - validateNewContext()", function(){
        it("Test Case #1 [ Success Case - Valid Context        ] [ Should Return True  ]", function(){
            expect(validateNewContext(validNewContextData.validNewContextOne, TestContextRegistry)).to.equal(true)
        })

        it("Test Case #2 [ Failure Case - Context Exists       ] [ Should Return False ]", function(){
            expect(validateNewContext(invalidNewContextData.invalidNewContextOne, TestContextRegistry)).to.equal(false)
        })

        it("Test Case #3 [ Failure Case - Kind Value Missing   ] [ Should Return False ]", function(){
            expect(validateNewContext(invalidNewContextData.invalidNewContextTwo, TestContextRegistry)).to.equal(false)
        })

        it("Test Case #4 [ Failure Case - Origin Missing       ] [ Should Return False ]", function(){
            expect(validateNewContext(invalidNewContextData.invalidNewContextThree, TestContextRegistry)).to.equal(false)
        })

        it("Test Case #5 [ Failure Case - Invalid Origin Value ] [ Should Return False ]", function(){
            expect(validateNewContext(invalidNewContextData.invalidNewContextThree, TestContextRegistry)).to.equal(false)
        })
    })
})