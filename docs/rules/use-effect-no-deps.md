# Warns a user when they call the react useEffect hook without a dependency array (use-effect-no-deps)

My team found that we rarely wanted to call the React useEffect hook without a dependency array. This rule makes it difficult for
a developer to accidentally re-run the effect on every render of the component.


## Rule Details

Examples of **incorrect** code for this rule:

```js

useEffect(() => { console.log('Accidentally run effect on every render!'); });

```

Examples of **correct** code for this rule:

```js

useEffect(() => { console.log('Don\'t run effect on every render!'); }, []);

```

## When Not To Use It

If you want to run the effect on every component render.
