// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { IsValidator } from "../utils.ts";
import { count } from "../../iter_utils.ts";

/** Max count validator. It checks items count is less than or equal to {@link limit}.
 *
 * @example
 * ```ts
 * import { MaxCountValidator } from "https://deno.land/x/abstruct@$VERSION/validators/iterable/max_count.ts";
 * declare const limit: number;
 * const validator = new MaxCountValidator(limit);
 * ```
 */
export class MaxCountValidator extends IsValidator<Iterable<unknown>> {
  constructor(public limit: number) {
    super();
  }

  override is(input: Iterable<unknown>): input is Iterable<unknown> {
    return count(input) <= this.limit;
  }

  override toString(): string {
    return `max items(${this.limit})`;
  }
}
