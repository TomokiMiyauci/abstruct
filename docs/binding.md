# Binding

Provides ready-to-use functionality. They are bound with default failure
messages.

They are also exported in the form of closures or, objects.

## Common interface

Binding includes the following interfaces.

### Validator

API to perform Validation. See [Validator](./validator.md) for details.

### Expectation

Objects with the `Expectation` interface can bind validation failure messages.

Static message:

```ts
import { string } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";

const StringValidator = string.expect("should be string");
```

Dynamic message:

The context is different for each object.

```ts
import { string } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";

const StringValidator = string.expect((context) =>
  `should be string, but ${typeof context.input}`
);
```

Objects implementing this interface also come with default messages.

## List of bindings

| Name                        | Closure / Object | Validator                   | Expectation |
| --------------------------- | :--------------: | --------------------------- | :---------: |
| [type](#type)               |     Closure      | TypeValidator               |     ✅      |
| [string](#instance)         |      Object      | TypeValidator               |     ✅      |
| [number](#instance)         |      Object      | TypeValidator               |     ✅      |
| [bigint](#instance)         |      Object      | TypeValidator               |     ✅      |
| [boolean](#instance)        |      Object      | TypeValidator               |     ✅      |
| [symbol](#instance)         |      Object      | TypeValidator               |     ✅      |
| [instance](#instance)       |     Closure      | InstanceValidator           |     ✅      |
| [props](#props)             |     Closure      | PropertiesValidator         |             |
| [optional](#optional)       |     Closure      | OptionalValidator           |             |
| [enumerator](#enumerator)   |     Closure      | EnumValidator               |     ✅      |
| [nullish](#nullish)         |      Object      | NullishValidator            |     ✅      |
| [propKey](#propkey)         |     Closure      | PropertyKeyValidator        |             |
| [propValue](#propvalue)     |     Closure      | PropertyValueValidator      |             |
| [and](#and)                 |     Closure      | AndValidator                |     ✅      |
| [or](#or)                   |     Closure      | OrValidator                 |     ✅      |
| [eq](#eq)                   |     Closure      | EqualityValidator           |     ✅      |
| [ne](#ne)                   |     Closure      | InequalityValidator         |     ✅      |
| [gt](#gt)                   |     Closure      | GreaterThanValidator        |     ✅      |
| [gte](#gt)                  |     Closure      | GreaterThanOrEqualValidator |     ✅      |
| [lt](#lt)                   |     Closure      | LessThanValidator           |     ✅      |
| [lte](#lte)                 |     Closure      | LessThanOrEqualValidator    |     ✅      |
| [between](#between)         |     Closure      | RangeValidator              |     ✅      |
| [not](#not)                 |     Closure      | NotValidator                |     ✅      |
| [has](#has)                 |     Closure      | InValidator                 |     ✅      |
| [pattern](#pattern)         |     Closure      | PatternValidator            |     ✅      |
| [item](#item)               |     Closure      | ItemValidator               |             |
| [count](#count)             |     Closure      | CountValidator              |     ✅      |
| [maxCount](#maxcount)       |     Closure      | MaxCountValidator           |     ✅      |
| [minCount](#mincount)       |     Closure      | MinCountValidator           |     ✅      |
| [single](#single)           |      Object      | SingleValidator             |     ✅      |
| [empty](#single)            |      Object      | EmptyValidator              |     ✅      |
| [nonEmpty](#nonempty)       |      Object      | NonEmptyValidator           |     ✅      |
| [unique](#unique)           |      Object      | UniqueValidator             |     ✅      |
| [fixedArray](#fixedarray)   |     Closure      | FixedArrayValidator         |             |
| [float](#float)             |      Object      | FloatValidator              |     ✅      |
| [int](#int)                 |      Object      | IntegerValidator            |     ✅      |
| [positive](#positive)       |      Object      | PositiveNumberValidator     |     ✅      |
| [negative](#negative)       |      Object      | NegativeNumberValidator     |     ✅      |
| [nonPositive](#nonpositive) |      Object      | NonPositiveNumberValidator  |     ✅      |
| [nonNegative](#nonnegative) |      Object      | NonNegativeNumberValidator  |     ✅      |
| [int8](#int8)               |      Object      | -                           |     ✅      |
| [int16](#int16)             |      Object      | -                           |     ✅      |
| [int32](#int32)             |      Object      | -                           |     ✅      |
| [uint8](#int8)              |      Object      | -                           |     ✅      |
| [uint16](#int8)             |      Object      | -                           |     ✅      |
| [uint32](#int8)             |      Object      | -                           |     ✅      |
| [validDate](#validdate)     |      Object      | ValidDateValidator          |     ✅      |

## type

Validator factory for JavaScript data type. The difference with `typeof`
operator is that `"object"` does not match `null`.

```ts
import { type } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
const validator = type("object");
```

## string

[![abstruct:string](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+string+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+string+%7D%5D#sharing)

String validator.

## number

[![abstruct:number](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+number+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+number+%7D%5D#sharing)

Number validator.

## bigint

[![abstruct:bigint](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+bigint+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+bigint+%7D%5D#sharing)

Bigint validator.

## boolean

[![abstruct:boolean](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+boolean+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+boolean+%7D%5D#sharing)

Boolean validator.

## symbol

[![abstruct:symbol](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+symbol+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+symbol+%7D%5D#sharing)

Symbol validator.

## instance

[![abstruct:instance](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+instance+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+instance+%7D%5D#sharing)

Validator factory equivalent to the `instanceof` operator.

```ts
import { instance } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
const validator = instance(Array);
```

## props

[![abstruct:props](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+props+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+props+%7D%5D#sharing)

Factory for properties validator.

```ts
import {
  number,
  props,
  string,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
const User = props({ name: string, age: number });
```

## optional

[![abstruct:optional](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+optional+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+optional+%7D%5D#sharing)

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

[![abstruct:enumerator](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+enumerator+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+enumerator+%7D%5D#sharing)

Factory for enumerator validator.

```ts
import { enumerator } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
const validator = enumerator(0, 1, 2, 3);
const validator2 = enumerator("Red", "Yellow", "Green");
```

## nullish

[![abstruct:nullish](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+nullish+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+nullish+%7D%5D#sharing)

Nullish(`null` or `undefined`) validator.

## propKey

[![abstruct:propKey](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+propKey+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+propKey+%7D%5D#sharing)

Factory for property key validator.

```ts
import {
  propKey,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
declare const validator: Validator<string>;
const keyValidator = propKey(validator);
```

## propValue

[![abstruct:propValue](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+propValue+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+propValue+%7D%5D#sharing)

Factory for property value validator.

```ts
import {
  propValue,
  type Validator,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
declare const validator: Validator;
const valueValidator = propValue(validator);
```

## and

[![abstruct:and](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+and+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+and+%7D%5D#sharing)

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
} from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
const _int8 = and(int, lte(128), gte(-127));
const __int8 = and(int, between(-127, 128));
```

note: [int8](#int8) provides.

### Type-narrowing

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

[![abstruct:or](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+or+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+or+%7D%5D#sharing)

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

[![abstruct:eq](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+eq+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+eq+%7D%5D#sharing)

Validator factory equivalent to strict equality(`===`) operator.

```ts
import { eq } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
const validator = eq(0);
```

## ne

[![abstruct:ne](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+ne+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+ne+%7D%5D#sharing)

Factory for validator equivalent to strict inequality(`!==`) operator.

```ts
import { ne } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
const validator = ne(0);
```

## gt

[![abstruct:gt](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+gt+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+gt+%7D%5D#sharing)

Factory for validator equivalent to greater than(`<`) operator.

```ts
import { gt } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
const validator = gt(8);
```

## gte

[![abstruct:gte](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+gte+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+gte+%7D%5D#sharing)

Factory for validator equivalent to greater than or equal(`<=`) operator.

```ts
import { gte } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
const validator = gte(8);
```

## lt

[![abstruct:lt](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+lt+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+lt+%7D%5D#sharing)

Factory for validator equivalent to less than(`>`) operator.

```ts
import { lt } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
const validator = lt(256);
```

## lte

[![abstruct:lte](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+lte+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+lte+%7D%5D#sharing)

Factory for validator equivalent to less than or equal to (`>=`) operator.

```ts
import { lte } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
const validator = lte(255);
```

## between

[![abstruct:between](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+between+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+between+%7D%5D#sharing)

Factory for range validator.

```ts
import { between } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
const numberRangeValidator = between(0, 255);
const dateRangeValidator = between(new Date("1970/1/1"), new Date("2038/1/19"));
```

## not

[![abstruct:not](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+not+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+not+%7D%5D#sharing)

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

[![abstruct:has](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+has+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+has+%7D%5D#sharing)

Factory for existence of property validator.

```ts
import { has } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
const validator = has("prop");
```

## pattern

[![abstruct:pattern](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+pattern+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+pattern+%7D%5D#sharing)

Factory for regex pattern validator.

```ts
import { pattern } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
const validator = pattern(/^\d*$/);
```

## item

[![abstruct:item](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+item+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+item+%7D%5D#sharing)

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

[![abstruct:count](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+count+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+count+%7D%5D#sharing)

Factory for count validator. It checks count(size, length) of items.

```ts
import { count } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
const validator = count(5);
```

## maxCount

[![abstruct:maxCount](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+maxCount+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+maxCount+%7D%5D#sharing)

Factory for max count validator. It checks items count is less than or equal to
`limit`.

```ts
import { maxCount } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
declare const limit: number;
const validator = maxCount(limit);
```

## minCount

[![abstruct:minCount](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+minCount+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+minCount+%7D%5D#sharing)

Factory for min count validator. It checks items count is greater than or equal
to `limit`.

```ts
import { minCount } from "https://deno.land/x/abstruct@$VERSION/bindings.ts";
declare const limit: number;
const validator = minCount(limit);
```

## single

[![abstruct:single](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+single+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+single+%7D%5D#sharing)

Single validator. It checks items is single.

## empty

[![abstruct:empty](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+empty+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+empty+%7D%5D#sharing)

Empty validator. It checks the items is empty.

## nonEmpty

[![abstruct:nonEmpty](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+nonEmpty+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+nonEmpty+%7D%5D#sharing)

Non-Empty validator. It checks items is non-empty.

## unique

[![abstruct:unique](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+unique+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+unique+%7D%5D#sharing)

Unique validator. It checks the each item is unique.

## fixedArray

[![abstruct:fixedArray](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+fixedArray+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+fixedArray+%7D%5D#sharing)

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

[![abstruct:float](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+float+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+float+%7D%5D#sharing)

Float validator.

## int

[![abstruct:int](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+int+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+int+%7D%5D#sharing)

Integer validator.

## positive

[![abstruct:positive](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+positive+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+positive+%7D%5D#sharing)

Positive number validator.

## negative

[![abstruct:negative](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+negative+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+negative+%7D%5D#sharing)

Negative number validator.

## nonPositive

[![abstruct:nonPositive](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+nonPositive+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+nonPositive+%7D%5D#sharing)

Non-positive number validator.

## nonNegative

[![abstruct:nonNegative](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+nonNegative+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+nonNegative+%7D%5D#sharing)

Non-negative number validator.

## int8

[![abstruct:int8](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+int8+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+int8+%7D%5D#sharing)

Integer in the range -127 ~ 128 validator.

## int16

[![abstruct:int16](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+int16+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+int16+%7D%5D#sharing)

Integer in the range -32768 ~ 32767 validator.

## int32

[![abstruct:int32](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+int32+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+int32+%7D%5D#sharing)

Integer in the range -2147483648 ~ 2147483647 validator.

## uint8

[![abstruct:uint8](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+uint8+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+uint8+%7D%5D#sharing)

Integer in the range 0 ~ 255 validator.

## uint16

[![abstruct:uint16](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+uint16+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+uint16+%7D%5D#sharing)

Integer in the range 0 ~ 65535 validator.

## uint32

[![abstruct:uint32](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+uint32+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+uint32+%7D%5D#sharing)

Integer in the range 0 ~ 4294967295 validator.

## validDate

[![abstruct:validDate](https://deno.bundlejs.com/?q=https://deno.land/x/abstruct/mod.ts&treeshake=[{+validDate+}]&badge=)](https://bundlejs.com/?q=https%3A%2F%2Fdeno.land%2Fx%2Fabstruct%2Fmod.ts&treeshake=%5B%7B+validDate+%7D%5D#sharing)

Valid `Date` validator.
