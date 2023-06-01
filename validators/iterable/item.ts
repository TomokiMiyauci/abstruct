// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { BasicValidator } from "../utils.ts";
import { curryR } from "../../deps.ts";
import { fromPath, print } from "../../utils.ts";
import { enumerate, map } from "../../iter_utils.ts";
import { type ValidationFailure, Validator } from "../../types.ts";

/** Item validator. It checks each item of items.
 *
 * @example
 * ```ts
 * import { ItemValidator } from "https://deno.land/x/abstruct@$VERSION/validators/iterable/item.ts";
 * import { type Validator } from "https://deno.land/x/abstruct@$VERSION/types.ts";
 * declare const validator: Validator;
 * const itemValidator = new ItemValidator(validator);
 * ```
 */
export class ItemValidator<T = unknown, U extends T = T>
  extends BasicValidator<Iterable<T>, Iterable<U>> {
  constructor(public readonly validator: Validator<T, U>) {
    super();
  }

  *validate(input: Iterable<T>): Iterable<ValidationFailure> {
    for (const [i, el] of enumerate(input)) {
      const iterable = this.validator.validate(el);
      const createError = curryR(fromPath, i);

      yield* map(iterable, createError);
    }
  }

  override toString(): string {
    return `items(${print(this.validator)})`;
  }
}
