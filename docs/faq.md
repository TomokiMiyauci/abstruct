# FAQ

Here are some frequently asked questions.

## Why `Validator` needs `is` implement

The `is` function of the `Validator` exists essentially only for type narrowing.

In current TypeScript, Narrowing can be accomplished by using Type guards or
`asserts`. Unfortunately, they can only represent `boolean` or throw errors.

We also considered separating the `is` function from the `Validator`, but this
created unnecessary complexity.

It was a requirement that `validate` be able to lazily generate results, so the
interface requires two functions.

## How to use in library

Don't forget to add a pure annotation so that users of your library will receive
the appropriate tree-shaking.

It is recommended that structure be defined at the top-level of the module. This
is because instantiation usually has a small overhead.

Most bundlers will mark top-level calls as having side-effects.

See [example:lib](../examples/lib.ts) for more information.

## About bundle size

Bundle sizes for individual modules are listed in the respective documentation.
This is a reference value for bundle size.

However, it should be noted that if multiple modules are used, they do not add
up.

This is because each module shares a reusable module.
