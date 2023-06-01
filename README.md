# abstruct

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/abstruct)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/abstruct/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/TomokiMiyauci/abstruct)](https://github.com/TomokiMiyauci/abstruct/releases)
[![codecov](https://codecov.io/github/TomokiMiyauci/abstruct/branch/main/graph/badge.svg)](https://codecov.io/gh/TomokiMiyauci/abstruct)
[![GitHub](https://img.shields.io/github/license/TomokiMiyauci/abstruct)](https://github.com/TomokiMiyauci/abstruct/blob/main/LICENSE)

[![test](https://github.com/TomokiMiyauci/abstruct/actions/workflows/test.yaml/badge.svg)](https://github.com/TomokiMiyauci/abstruct/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/abstruct.png?mini=true)](https://nodei.co/npm/abstruct/)

Abstract structure for JavaScript data validation

Abstruct(not abstract!) provides features for defining data structures. It used
for any operation. For example, validation.

## Usage

Define the data structure and validate.

```ts
import {
  and,
  assert,
  maxCount,
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

Validators do only one thing, so they can be combined to make new validator.

```ts
import {
  and,
  gte,
  int,
  lte,
  validate,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";

const Int8 = and(
  int,
  gte(-127),
  lte(128),
);
declare const input: number;

const result = validate(Int8, input);

if (result.isOk()) {
  // result.value;
} else {
  // result.value;
}
```

And narrowing works correctly.

```ts
import {
  and,
  assert,
  gte,
  instance,
  lte,
  validDate,
} from "https://deno.land/x/abstruct@$VERSION/mod.ts";
import { Assert, IsExact } from "https://deno.land/std/testing/types.ts";

const ValidDate = and(
  instance(Date),
  validDate,
  gte(new Date("1970/1/1")),
  lte(new Date("2038/1/19")),
);
const input: unknown = null;

assert(ValidDate, input);

type doTest = Assert<IsExact<typeof input, Date>, true>;
```

Fully customizable messages:

```ts
import { int8, string } from "https://deno.land/x/abstruct@$VERSION/mod.ts";

const Int8 = int8.expect("should be int8!!!");
const ID = string.expect(({ input }) =>
  `id should be string, actual ${typeof input}`
);
```

## Philosophy

1. Composable: All features are composable. Being composable brings the
   following features as a side effect:

   - Single responsibility
   - DRY
   - Pay as you go
   - Customizable
   - Tiny

2. Library first: It can use in library. To fulfill this, special attention has
   been paid to the following:

   - Universal
   - Customizable
   - Tiny

3. Type first: Type safety is a matter of course.

## Documentation

You have very little to learn.

- [Validator](./docs/validator.md)
- [Validation](./docs/validation.md)
- [Binding](./docs/binding.md)
- [FAQ](./docs/faq.md)

## Example

Few examples of common patterns:

- [Basic](./examples/basic.ts)
- [Compose validators](./examples/compose_validators.ts)
- [Custom message](./examples/custom_message.ts)

## Inspired by

- [JSON Type Definition](https://github.com/jsontypedef)
- [JSON schema](https://github.com/json-schema-org)
- [superstruct](https://github.com/ianstormtaylor/superstruct)
- [joi](https://github.com/hapijs/joi)
- [io-ts](https://github.com/gcanti/io-ts)
- [zod](https://github.com/colinhacks/zod)

## License

Copyright © 2023-present [Tomoki Miyauci](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license
