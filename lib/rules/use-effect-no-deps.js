/**
 * @fileoverview Warns a user when they call the react useEffect hook without a dependency array
 * @author Alex Henry
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        "Warns a user when they call the react useEffect hook without a dependency array",
      category: "Fill me in",
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    /**
     * Visitor for both function expressions and arrow function expressions.
     */
    function visitFunctionExpression(node) {
      // We only want to lint nodes which are reactive hook callbacks.
      if (
        (node.type !== "FunctionExpression" &&
          node.type !== "ArrowFunctionExpression") ||
        node.parent.type !== "CallExpression"
      ) {
        return;
      }

      const callbackIndex = getReactiveHookCallbackIndex(
        node.parent.callee,
        options
      );
      if (node.parent.arguments[callbackIndex] !== node) {
        return;
      }

      // Get the reactive hook node.
      const reactiveHook = node.parent.callee;
      const reactiveHookName = getNodeWithoutReactNamespace(reactiveHook).name;
      if (reactiveHookName !== "useEffect") {
        return;
      }

      // Get the declared dependencies for this reactive hook. If there is no
      // second argument then the reactive callback will re-run on every render.
      // In this case, we want to warn the user they may be making a mistake.
      const depsIndex = callbackIndex + 1;
      const declaredDependenciesNode = node.parent.arguments[depsIndex];
      if (!declaredDependenciesNode) {
        context.report({
          node: node.parent.callee,
          message:
            `React hook useEffect re-runs on every render when called with ` +
            `only one argument. Did you forget to pass an array of dependencies?`
        });
      }
    }

    return {
      FunctionExpression: visitFunctionExpression,
      ArrowFunctionExpression: visitFunctionExpression
    };
  }
};
