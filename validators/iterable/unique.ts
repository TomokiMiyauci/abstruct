// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isEmpty } from "../../deps.ts";
import { enumerate } from "../../iter_utils.ts";
import { Reporter, ValidationFailure, Validator } from "../../types.ts";

interface Context {
  input: Iterable<unknown>;
  index: number;
  item: unknown;
}

export class UniqueValidator extends Reporter<Context>
  implements Validator<Iterable<unknown>> {
  is(input: Iterable<unknown>): input is Iterable<unknown> {
    return isEmpty(this.validate(input));
  }

  *validate(input: Iterable<unknown>): Iterable<ValidationFailure> {
    for (const [index, item] of duplicates(input)) {
      yield new ValidationFailure(
        this.report({ input, item, index }),
        {
          instancePath: [index.toString()],
        },
      );
    }
  }

  override toString() {
    return "unique";
  }
}

function* duplicates<T>(
  iterable: Iterable<T>,
): Iterable<[index: number, item: T]> {
  const seen = new Set<T>();

  for (const [i, item] of enumerate(iterable)) {
    if (seen.has(item)) {
      yield [i, item];
    } else {
      seen.add(item);
    }
  }
}
