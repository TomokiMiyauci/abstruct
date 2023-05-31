# abstruct

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/abstruct)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/abstruct/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/TomokiMiyauci/abstruct)](https://github.com/TomokiMiyauci/abstruct/releases)
[![codecov](https://codecov.io/github/TomokiMiyauci/abstruct/branch/main/graph/badge.svg)](https://codecov.io/gh/TomokiMiyauci/abstruct)
[![GitHub](https://img.shields.io/github/license/TomokiMiyauci/abstruct)](https://github.com/TomokiMiyauci/abstruct/blob/main/LICENSE)

[![test](https://github.com/TomokiMiyauci/abstruct/actions/workflows/test.yaml/badge.svg)](https://github.com/TomokiMiyauci/abstruct/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/abstruct.png?mini=true)](https://nodei.co/npm/abstruct/)

Abstract structure for JavaScript data validation

Abstruct(not abstract!) provides functions for defining data structures. It also
has an abstract interface that allows data structures to be used for any
operation. For example, validation.

## Features

- Composable

  It is composable and you only pay the cost for what you need. All features are
  supported around this feature.

- High performance

  We actively employ delay evaluation. It is not performed until it is needed.
  Composable allows each module to take on only one responsibility. Therefore,
  there is very little duplication of logic.

- Tiny

  Great care is taken to keep code size small. Composable also contributes to
  size.

- Library first

  It can be used with any 3rd party library. Therefore, it is small and care is
  taken not to bring unnecessary code into the library.

Also, as a validation,

- Default error messages

  Validator consists of a very small default error message. You can begin
  validation out of box.

- Error message first

  Error messages are the central issue in validation. The appropriate error
  message depends on the recipient. The default error message may not be the
  best for every subject. The solution to this challenge is to make them fully
  customizable.

- Upstream definition

  Error messages can be bound to data structures. Therefore, messages can be
  defined very close to the data structure definition. There is no need to
  create error messages from errors.

- Type assertion

  The validator can assert the type of the input. This allows the validation
  result to be automatically type inferred.

## Quick view

```ts
import {
  and,
  assert,
  maxCount,
  number,
  object,
  pattern,
  string,
  validDate,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts";

const Id = and(string, pattern(/^\d$/));
const Book = object({
  id: Id,
  title: maxCount(256).expect(`length should be less than or equal to 256`),
  publishAt: validDate,
});

assertThrows(() =>
  assert(Book, {
    id: 0,
    title: "Harry Potter and the Philosopher's Stone",
    publishAt: new Date("1997/6/26"),
  })
);
```

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

## Factories

It provides validator factories.

### type

Validator factory for JavaScript data type. The difference with `typeof`
operator is that `"object"` does not match `null`.

```ts
import { type } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = type("object");
```

### instance

Validator factory equivalent to the `instanceof` operator.

```ts
import { instance } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = instance(Array);
```

### object

Factory for object validator.

```ts
import {
  number,
  object,
  string,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
const User = object({ name: string, age: number });
```

### optional

Factory for optional properties validator.

```ts
import {
  number,
  optional,
  string,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
const Profile = optional({ greeting: string, hobby: string });
```

### enumerator

Factory for enumerator validator.

```ts
import { enumerator } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = enumerator(0, 1, 2, 3);
const validator2 = enumerator("Red", "Yellow", "Green");
```

### nullish

Nullish(`null` or `undefined`) validator.

### key

Factory for property key validator.

```ts
import {
  key,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
declare const validator: Validator<string>;
const keyValidator = key(validator);
```

### value

Factory for property value validator.

```ts
import {
  type Validator,
  value,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
declare const validator: Validator;
const valueValidator = value(validator);
```

### and

Factory for validator composer like Logical AND.

`and` composes multiple validators and creates a new validator. The composed
validator executes the validator from left to right, just like the Logical AND
operator. If the validation fails en route, the evaluation stops there.

```ts
import {
  and,
  between,
  gte,
  int,
  lte,
} from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const _int8 = and(int, lte(128), gte(-127));
const __int8 = and(int, between(-127, 128));
```

note: [int8](#int8) provides.

#### Type-narrowing

Composition of `and` is type-safe.

Each validator is corrected to satisfy the narrowed type from the previous
validators.

```ts
import {
  and,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
import { assertType, type Has } from "https://deno.land/std/testing/types.ts";
declare const v1: Validator<unknown, string>;
declare const v2: Validator<string, "a" | "b">;
declare const v3: Validator<"a" | "b" | "c", "a">;
const validator = and(v1, v2, v3);

assertType<Has<typeof validator, Validator<unknown, "a">>>(true);
```

The following example shows type error because it is insufficient narrowing.

```ts
import {
  and,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
import { assertType, type Has } from "https://deno.land/std/testing/types.ts";
declare const v1: Validator<number, -1 | 0 | 1>;
declare const v2: Validator<0 | 1, 0>;

// @ts-expect-error v2 should type-compatible with `Validator<-1 | 0 | 1>`.
const validator = and(v1, v2);
```

The following example is correct because it is faithful to Logical AND
narrowing.

```ts
import {
  and,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
import { assertType, type Has } from "https://deno.land/std/testing/types.ts";
declare const v1: Validator<unknown, string>;
declare const v2: Validator<unknown, number>;
const validator = and(v1, v2);

assertType<Has<typeof validator, Validator<unknown, never>>>(true);
```

#### Limit the number of arguments

The number of arguments is limited by overloading to achieve this.

Currently it accepts up to 5 arguments.

This limit is based on the strict `Function.bind` type signature.

If more than that is needed, you must nest `and`.

### or

Factory for validator composer like Logical OR.

```ts
import {
  or,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
import { assertType, type Has } from "https://deno.land/std/testing/types.ts";
declare const v1: Validator;
declare const v2: Validator;
declare const v3: Validator;

const validator = or(v1, v2, v3);
```

If the validators are not type-compatible with each other, generics must be
specified.

```ts
import {
  or,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
import { assertType, type Has } from "https://deno.land/std/testing/types.ts";
declare const v1: Validator<unknown, string>;
declare const v2: Validator<unknown, number>;
const validator = or<unknown, string | number>(v1, v2);

assertType<Has<typeof validator, Validator<unknown, string | number>>>(true);
```

For more information, see
[Specifying Type Arguments](https://www.typescriptlang.org/docs/handbook/2/functions.html#specifying-type-arguments).

### eq

Validator factory equivalent to strict equality(`===`) operator.

```ts
import { eq } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = eq(0);
```

### ne

Factory for validator equivalent to strict inequality(`!==`) operator.

```ts
import { ne } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = ne(0);
```

### gt

Factory for validator equivalent to greater than(`<`) operator.

```ts
import { gt } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = gt(8);
```

### gte

Factory for validator equivalent to greater than or equal(`<=`) operator.

```ts
import { gte } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = gte(8);
```

### lt

Factory for validator equivalent to less than(`>`) operator.

```ts
import { lt } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = lt(256);
```

### lte

Factory for validator equivalent to less than or equal to (`>=`) operator.

```ts
import { lte } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = lte(255);
```

### between

Factory for range validator.

```ts
import { between } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const numberRangeValidator = between(0, 255);
const dateRangeValidator = between(new Date("1970/1/1"), new Date("2038/1/19"));
```

### not

Factory for validator inversion.

```ts
import {
  not,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";

declare const validator: Validator;
const inversionValidator = not(validator);
```

### has

Factory for existence of property validator.

```ts
import { has } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = has("prop");
```

### pattern

Factory for regex pattern validator.

```ts
import { pattern } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = pattern(/^\d*$/);
```

### item

Factory for item validator. It checks each item of items.

```ts
import {
  item,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
declare const validator: Validator;
const itemValidator = item(validator);
```

### count

Factory for count validator. It checks count(size, length) of items.

```ts
import { count } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = count(5);
```

### maxCount

Factory for max count validator. It checks items count is less than or equal to
`limit`.

```ts
import { maxCount } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
declare const limit: number;
const validator = maxCount(limit);
```

### minCount

Factory for min count validator. It checks items count is greater than or equal
to `limit`.

```ts
import { minCount } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
declare const limit: number;
const validator = minCount(limit);
```

### single

Single validator. It checks items is single.

### empty

Empty validator. It checks the items is empty.

### nonEmpty

Non-Empty validator. It checks items is non-empty.

### unique

Unique validator. It checks the each item is unique.

### fixedArray

Factory for fixed array validator. It checks each item passes each `Validator`.

```ts
import {
  fixedArray,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
declare const v1: Validator;
declare const v2: Validator;
const validator = fixedArray(v1, v2);
```

### float

Float validator.

### int

Integer validator.

### positive

Positive number validator.

### negative

Negative number validator.

### nonNegative

Non-negative number validator.

### nonPositive

Non-positive number validator.

### int8

Integer in the range -127 ~ 128 validator.

### int16

Integer in the range -32768 ~ 32767 validator.

### int32

Integer in the range -2147483648 ~ 2147483647 validator.

### uint8

Integer in the range 0 ~ 255 validator.

### uint16

Integer in the range 0 ~ 65535 validator.

### uint32

Integer in the range 0 ~ 4294967295 validator.

### validDate

Valid `Date` validator.

## License

Copyright © 2023-present [Tomoki Miyauci](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license
