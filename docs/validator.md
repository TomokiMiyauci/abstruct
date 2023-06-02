# validator

Validator is a standard API for validation.

## Interface

The Validator is the following interface:

```ts
interface Validator<In = unknown, RIn extends In = In> {
  /** Validates the input and yield validation errors if exists. */
  validate: (input: In) => Iterable<ValidationFailure>;

  /** Whether the input is valid or not. */
  is: (input: In) => input is RIn;
}

/** Validation failure. */
interface ValidationFailure {
  /** The validation failure message. */
  message: string;

  /** The path to a part of the instance. */
  instancePath: PropertyKey[];
}
```

Generics `In` represents the tolerance of the validator.

Generics `RIn` is the type of the refinement by narrowing. That is, it
represents a Refined `In`.

Thus, `Validator<In, RIn>` is expressed as "a validator that accepts `In` and
guarantees that it is `RIn` if validation succeeds.

Due to type system expressivity constraints, `RIn` may be the same as `In`.

`validate` performs validation and can report a `ValidationFailure`. `Iterable`
indicates that it is lazy executable.

The absence of any `ValidationFailure` indicates that the validation was
successful.

`ValidationFailure` can provide the reason why the validation failed and
information about the target. Currently, only instance paths are standardized.

The `is` exists primarily for type narrowing. See
[FAQ: Why `Validator` needs `is` implement](./faq.md#why-validator-needs-is-implement)
for why this is necessary.

## Define Validator

Validators are very simple and easy to define.

```ts
import {
  type ValidationFailure,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";

const StringValidator: Validator<unknown, string> = {
  *validate(input: unknown): Iterable<ValidationFailure> {
    if (!this.is(input)) {
      yield {
        message: `should be string, actual ${typeof input}`,
        instancePath: [],
      };
    }
  },
  is(input: unknown): input is string {
    return typeof input === "string";
  },
};
```

Of course, helpers are available, but it is worthwhile to know how to define
them in a pure way.

It can be refactored as follows:

```ts
import {
  ValidationFailure,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";

const StringValidator: Validator<unknown, string> = {
  *validate(input: unknown): Iterable<ValidationFailure> {
    if (!this.is(input)) {
      yield new ValidationFailure(`should be string, actual ${typeof input}`);
    }
  },
  is(input: unknown): input is string {
    return typeof input === "string";
  },
};
```

You will want to define only one of the two required methods.

### Validator from `validate`

The essential function of `Validator` is `validate`. Here is how to define a
validator from a `validate`.

Class style:

```ts
import { BasicValidator } from "https://deno.land/x/abstruct@$VERSION/mod.ts";

class StringItemValidator
  extends BasicValidator<Iterable<unknown>, Iterable<string>> {
  *validate(input: Iterable<unknown>) {
    let i = 0;

    for (const item of input) {
      if (typeof item !== "string") {
        yield {
          message: `should be string, actual ${typeof input}`,
          instancePath: [i++],
        };
      }
    }
  }
}
```

Function style:

```ts
import { defineValidator } from "https://deno.land/x/abstruct@$VERSION/mod.ts";

const StringItemValidator = defineValidator<
  Iterable<unknown>,
  Iterable<string>
>(function* (input) {
  let i = 0;

  for (const item of input) {
    if (typeof item !== "string") {
      yield {
        message: `should be string, actual ${typeof input}`,
        instancePath: [i++],
      };
    }
  }
});
```

### Validator from `is`

For validators that target a single value, you will want to define the validator
from the `is` function rather than from the `validate`.

However, `is` is not very expressive of validation failure, so the following
interface is defined.

```ts
interface Checker<In> {
  check: (input: In) => true | string;
}
```

If `check` is `true`, the validation represents success. And `string` represents
a failure and the reason for the failure.

Class style:

```ts
import { ScalarValidator } from "https://deno.land/x/abstruct@$VERSION/mod.ts";

class StringValidator extends ScalarValidator<unknown, string> {
  check(input: unknown): true | string {
    const typeOf = typeof input;

    return typeOf === "string" || `should be string, actual ${typeOf}`;
  }
}
```

Functional style:

```ts
import { defineScalarValidator } from "https://deno.land/x/abstruct@$VERSION/mod.ts";

const StringValidator = defineScalarValidator<unknown, string>((input) => {
  const typeOf = typeof input;

  return typeOf === "string" || `should be string, actual ${typeOf}`;
});
```

## Standard validators

The following is a list of standard validators.

In indicates the broadest type accepted. Most validators have generics and will
do narrowing, but check the implementation.

| Name                        | In                                      |
| --------------------------- | --------------------------------------- |
| EnumValidator               | `unknown`                               |
| NullishValidator            | `unknown`                               |
| RangeValidator              | `unknown`                               |
| PatternValidator            | `string`                                |
| AndValidator                | `unknown`                               |
| EqualityValidator           | `unknown`                               |
| InequalityValidator         | `unknown`                               |
| GreaterThanValidator        | `unknown`                               |
| GreaterThanOrEqualValidator | `unknown`                               |
| LessThanValidator           | `unknown`                               |
| LessThanOrEqualValidator    | `unknown`                               |
| InstanceValidator           | `unknown`                               |
| NotValidatorValidator       | `unknown`                               |
| OrValidatorValidator        | `unknown`                               |
| TypeValidator               | `unknown`                               |
| PropertiesValidator         | `Record<PropertyKey, unknown>`          |
| OptionalValidator           | `Partial<Record<PropertyKey, unknown>>` |
| PropertyValueValidator      | `Record<string, unknown>`               |
| PropertyKeyValidator        | `object`                                |
| NegativeNumberValidator     | `number` &#124; `bigint`                |
| NonNegativeNumberValidator  | `number` &#124; `bigint`                |
| NonPositiveNumberValidator  | `number` &#124; `bigint`                |
| PositiveNumberValidator     | `number` &#124; `bigint`                |
| FloatValidatorValidator     | `number`                                |
| IntegerValidator            | `number`                                |
| EmptyValidator              | `Iterable<unknown>`                     |
| NonEmptyValidator           | `Iterable<unknown>`                     |
| ItemValidator               | `Iterable<unknown>`                     |
| CountValidator              | `Iterable<unknown>`                     |
| MaxCountValidator           | `Iterable<unknown>`                     |
| MinCountValidator           | `Iterable<unknown>`                     |
| SingleValidator             | `Iterable<unknown>`                     |
| UniqueValidator             | `Iterable<unknown>`                     |
| ValidDateValidator          | `Date`                                  |
| FixedArrayValidator         | `unknown[]`                             |
