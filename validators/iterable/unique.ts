// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { BasicValidator } from "../utils.ts";
import { enumerate } from "../../iter_utils.ts";
import { ValidationFailure } from "../../types.ts";

export interface Context {
  /** Item index. */
  index: number;
  item: unknown;
}

/** Unique validator. It checks the each item is unique.
 *
 * @example
 * ```ts
 * import { UniqueValidator } from "https://deno.land/x/abstruct@$VERSION/validators/iterable/unique.ts";
 * const validator = new UniqueValidator();
 * ```
 */
export class UniqueValidator extends BasicValidator<Iterable<unknown>> {
  override *validate(
    input: Iterable<unknown>,
  ): Iterable<ValidationFailure & Context> {
    for (const [index, item] of duplicates(input)) {
      yield { message: "", instancePath: [index], item, index };
    }
  }

  override toString(): string {
    return "unique";
  }
}

/** Yield duplicated items. */
export function* duplicates<T>(
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
