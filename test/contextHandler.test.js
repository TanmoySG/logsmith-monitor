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
    },
    validNewContextTwo: {
        "context": "context#4",
        "origin": "test.context.handler:1000/context#4",
        "description": "Test Context - Test #4",
        "kind": {
            "logs": [],
            "metrics": []
        }
    }
}

const invalidContextData = {

}

// ContextHandler - Validation Check - Tests
describe("ContextHandler-Validate Tests", function(){
    describe("validateNewContext() Test", function(){
        it("Should Return True", function(){
            expect(validateNewContext(validNewContextData.validNewContextOne, TestContextRegistry)).to.equal(true)
        })
    })
})