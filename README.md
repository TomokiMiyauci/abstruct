# abstruct

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/abstruct)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/abstruct/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/TomokiMiyauci/abstruct)](https://github.com/TomokiMiyauci/abstruct/releases)
[![codecov](https://codecov.io/github/TomokiMiyauci/abstruct/branch/main/graph/badge.svg)](https://codecov.io/gh/TomokiMiyauci/abstruct)
[![GitHub](https://img.shields.io/github/license/TomokiMiyauci/abstruct)](https://github.com/TomokiMiyauci/abstruct/blob/main/LICENSE)

[![test](https://github.com/TomokiMiyauci/abstruct/actions/workflows/test.yaml/badge.svg)](https://github.com/TomokiMiyauci/abstruct/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/abstruct.png?mini=true)](https://nodei.co/npm/abstruct/)

Composable, validation for JavaScript data

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
  max,
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
  title: maxCount(256).expect(`should be less than or equal to 256`),
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

## License

Copyright © 2023-present [Tomoki Miyauci](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license