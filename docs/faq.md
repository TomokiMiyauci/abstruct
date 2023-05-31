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
