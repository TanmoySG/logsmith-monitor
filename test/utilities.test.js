import { expect } from "chai";

import { StandardizeIdentifier } from "../handlers/utilities/identifierUtility.js";

const TestCases = {
    CaseOne: "app@com/test",
    CaseTwo: "app.com.test",
    CaseThree: "app com. test"
}

describe("Utilities - Identifier Utility Tests", function () {
    describe("Testing Method - StandardizeIdentifier()", function () {
        it(`Test Case #1 [ ${TestCases.CaseOne}  ] [ Should Return app.com.test ]`, function () {
            expect(StandardizeIdentifier(TestCases.CaseOne)).to.equal("app.com.test");
        })
        it(`Test Case #2 [ ${TestCases.CaseTwo}  ] [ Should Return app.com.test ]`, function () {
            expect(StandardizeIdentifier(TestCases.CaseTwo)).to.equal("app.com.test");
        })
        it(`Test Case #3 [ ${TestCases.CaseThree} ] [ Should Return app.com.test ]`, function () {
            expect(StandardizeIdentifier(TestCases.CaseThree)).to.equal("app.com.test");
        })
    })
})