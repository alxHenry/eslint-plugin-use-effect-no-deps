/**
 * @fileoverview Warns a user when they call the react useEffect hook without a dependency array
 * @author Alex Henry
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/use-effect-no-deps"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("use-effect-no-deps", rule, {
  valid: [
    {
      code: "useEffect(() => { console.log('test'); }, []);"
    }
  ],

  invalid: [
    {
      code: "useEffect(() => { console.log('test'); });",
      errors: [
        {
          message: "Fill me in.",
          type: "Me too"
        }
      ]
    }
  ]
});
