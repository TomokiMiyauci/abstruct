# Validation

Utility to execute validation with the [Validator](./validator.md).

## validate

The `validate` executes the validator and returns a `Result` type. If validation
succeeds, it returns `Ok(T)`. If it fails, it returns `Err(E)`.

If `Ok`, the value after narrowing of the type is stored.

```ts
import {
  fixedArray,
  number,
  string,
  validate,
  type ValidationFailure,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
import type {
  Assert,
  Has,
  IsExact,
} from "https://deno.land/std/testing/types.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const Tuple = fixedArray(string, number);

type doTest = Assert<
  Has<typeof Tuple, Validator<[unknown, unknown], [string, number]>>,
  true
>;

const result = validate(Tuple, [0, ""]);
declare const failure: ValidationFailure;

if (result.isOk()) {
  type doTest = Assert<IsExact<typeof result.value, [string, number]>, true>;
} else {
  assertEquals(result.value, [failure, failure]);
}
```

By default, validate collects as many errors as possible.

### maxFailures

The maximum number of `ValidationFailure`. It should be positive integer.

The default is `Number.MAX_SAFE_INTEGER`.

Example of fail fast:

```ts
import {
  fixedArray,
  number,
  string,
  validate,
  type ValidationFailure,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
import type {
  Assert,
  Has,
  IsExact,
} from "https://deno.land/std/testing/types.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const Tuple = fixedArray(string, number);
const result = validate(Tuple, [0, ""], { maxFailures: 1 });
declare const failure: ValidationFailure;

if (result.isErr()) {
  assertEquals(result.value, [failure]);
}
```

Because the validator performs lazy evaluation, limiting the number of errors
improves performance.

### Throwing error

Throws an error in the following cases:

- `RangeError`: If [maxFailures](#maxfailures) is not positive integer.

## assert

Assert that the input passes validator.

```ts
import {
  assert,
  number,
  object,
  string,
  ValidationError,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
import {
  assertEquals,
  assertIsError,
} from "https://deno.land/std/testing/asserts.ts";

const Profile = object({ name: string, age: number });

try {
  assert(Profile, { name: null, age: null });
} catch (e) {
  assertIsError(e, ValidationError, "<string validation message>");
}
```

The default behavior of `assert` is fail fast. That is, it stops working as soon
as it finds a validation failure.

`assert` provides flexible options, allowing the following customizations.

- Error instance
- Fail slow mode
  - Limit number of failures

### Validation error

There is a setting for validation error under the `validation` property.

The following elements of this instance can be customized:

- Constructor
- Error message
- Error by cause

#### Validation error constructor

The default constructor is `ValidationError`.

You may want to throw a web standard error. In this case, you can change the
constructor in the `error` field.

```ts
import { assert, between } from "https://deno.land/x/abstruct@$VERSION/mod.ts";
import {
  assertEquals,
  assertIsError,
} from "https://deno.land/std/testing/asserts.ts";

try {
  assert(between(0, 255), 256, { validation: { error: RangeError } });
} catch (e) {
  assertIsError(e, RangeError);
}
```

This would be especially appropriate for libraries.

#### Validation default error message

A default error message can be specified, falling back to the default if the
validator's failure message is empty.

This is usually not necessary since the validator normally reports failure
messages.

```ts
import {
  assert,
  ValidationError,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
import {
  assertEquals,
  assertIsError,
} from "https://deno.land/std/testing/asserts.ts";

declare const emptyMsgValidator: Validator;
declare const input: unknown;
declare const defaultMsg: string;

try {
  assert(emptyMsgValidator, input, { validation: { message: defaultMsg } });
} catch (e) {
  assertIsError(e, ValidationError, defaultMsg);
}
```

#### Error by cause

Original cause of the error.

```ts
import {
  assert,
  ValidationError,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
import {
  assertEquals,
  assertIsError,
} from "https://deno.land/std/testing/asserts.ts";

declare const validator: Validator;
declare const input: unknown;
declare const cause: unknown;

assert(validator, input, { validation: { cause } });
```

### Fail slow

To execute multiple validations, specify `failSlow`. This delays throwing errors
until the specified number of failures is reached.

The error instance will then be `AggregateError` since multiple failures may be
found.

```ts
import {
  assert,
  number,
  object,
  string,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
import {
  assertEquals,
  assertIsError,
} from "https://deno.land/std/testing/asserts.ts";

const Profile = object({ name: string, age: number });

try {
  assert(Profile, { name: null, age: null }, { failSlow: true });
} catch (e) {
  assertIsError(e, AggregateError);
  assertEquals(e.errors.length, 2);
}
```

#### maxFailures option

The number of validation failures can be changed with `maxFailures`. For
details, see [maxFailures](#maxfailures)

#### aggregation

There is a setting for `AggregateError` under the `aggregation` property.

The following element can be customized as
[Validation error](#validation-error).

- [error](#validation-error-constructor)
- [message](#validation-default-error-message)
- [cause](#error-by-cause)

The `message` in `AggregateError` is empty by default.

In fail slow mode, it is recommended to provide it.

### Throwing error

Throws an error in the following cases:

- `ValidationError`: If assertion is fail.
- `AggregateError`: If assertion is fail and [failSlow](#fail-slow) is `true`.
- Same as [validate](#throwing-error).
