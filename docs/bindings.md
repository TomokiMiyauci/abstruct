# Bindings

Provides ready-to-use functionality. They are bound with default failure
messages.

They are also exported in the form of closures or, objects.

## type

Validator factory for JavaScript data type. The difference with `typeof`
operator is that `"object"` does not match `null`.

```ts
import { type } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = type("object");
```

## instance

Validator factory equivalent to the `instanceof` operator.

```ts
import { instance } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = instance(Array);
```

## object

Factory for object validator.

```ts
import {
  number,
  object,
  string,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
const User = object({ name: string, age: number });
```

## optional

Factory for optional properties validator.

```ts
import {
  number,
  optional,
  string,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
const Profile = optional({ greeting: string, hobby: string });
```

## enumerator

Factory for enumerator validator.

```ts
import { enumerator } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = enumerator(0, 1, 2, 3);
const validator2 = enumerator("Red", "Yellow", "Green");
```

## nullish

Nullish(`null` or `undefined`) validator.

## key

Factory for property key validator.

```ts
import {
  key,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
declare const validator: Validator<string>;
const keyValidator = key(validator);
```

## value

Factory for property value validator.

```ts
import {
  type Validator,
  value,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
declare const validator: Validator;
const valueValidator = value(validator);
```

## and

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

## Type-narrowing

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

### Limit the number of arguments

The number of arguments is limited by overloading to achieve this.

Currently it accepts up to 5 arguments.

This limit is based on the strict `Function.bind` type signature.

If more than that is needed, you must nest `and`.

## or

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

## eq

Validator factory equivalent to strict equality(`===`) operator.

```ts
import { eq } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = eq(0);
```

## ne

Factory for validator equivalent to strict inequality(`!==`) operator.

```ts
import { ne } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = ne(0);
```

## gt

Factory for validator equivalent to greater than(`<`) operator.

```ts
import { gt } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = gt(8);
```

## gte

Factory for validator equivalent to greater than or equal(`<=`) operator.

```ts
import { gte } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = gte(8);
```

## lt

Factory for validator equivalent to less than(`>`) operator.

```ts
import { lt } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = lt(256);
```

## lte

Factory for validator equivalent to less than or equal to (`>=`) operator.

```ts
import { lte } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = lte(255);
```

## between

Factory for range validator.

```ts
import { between } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const numberRangeValidator = between(0, 255);
const dateRangeValidator = between(new Date("1970/1/1"), new Date("2038/1/19"));
```

## not

Factory for validator inversion.

```ts
import {
  not,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";

declare const validator: Validator;
const inversionValidator = not(validator);
```

## has

Factory for existence of property validator.

```ts
import { has } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = has("prop");
```

## pattern

Factory for regex pattern validator.

```ts
import { pattern } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = pattern(/^\d*$/);
```

## item

Factory for item validator. It checks each item of items.

```ts
import {
  item,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
declare const validator: Validator;
const itemValidator = item(validator);
```

## count

Factory for count validator. It checks count(size, length) of items.

```ts
import { count } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
const validator = count(5);
```

## maxCount

Factory for max count validator. It checks items count is less than or equal to
`limit`.

```ts
import { maxCount } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
declare const limit: number;
const validator = maxCount(limit);
```

## minCount

Factory for min count validator. It checks items count is greater than or equal
to `limit`.

```ts
import { minCount } from "https://deno.land/x/abstruct@$VERSION/factories.ts";
declare const limit: number;
const validator = minCount(limit);
```

## single

Single validator. It checks items is single.

## empty

Empty validator. It checks the items is empty.

## nonEmpty

Non-Empty validator. It checks items is non-empty.

## unique

Unique validator. It checks the each item is unique.

## fixedArray

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

## float

Float validator.

## int

Integer validator.

## positive

Positive number validator.

## negative

Negative number validator.

## nonNegative

Non-negative number validator.

## nonPositive

Non-positive number validator.

## int8

Integer in the range -127 ~ 128 validator.

## int16

Integer in the range -32768 ~ 32767 validator.

## int32

Integer in the range -2147483648 ~ 2147483647 validator.

## uint8

Integer in the range 0 ~ 255 validator.

## uint16

Integer in the range 0 ~ 65535 validator.

## uint32

Integer in the range 0 ~ 4294967295 validator.

## validDate

Valid `Date` validator.
