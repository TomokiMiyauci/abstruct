// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { count } from "../../iter_utils.ts";
import { ScalarValidator } from "../../utils.ts";

/** Min count validator. It checks items count is greater than or equal to {@link limit}.
 *
 * @example
 * ```ts
 * import { MinCountValidator } from "https://deno.land/x/abstruct@$VERSION/validators/iterable/min_count.ts";
 * declare const limit: number;
 * const validator = new MinCountValidator(limit);
 * ```
 */
export class MinCountValidator extends ScalarValidator<Iterable<unknown>> {
  constructor(public limit: number) {
    super();
  }

  override is(input: Iterable<unknown>): input is Iterable<unknown> {
    return count(input) >= this.limit;
  }

  override toString(): string {
    return `min items(${this.limit})`;
  }
}
