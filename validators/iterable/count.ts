// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ScalarValidator } from "../../utils.ts";
import { count } from "../../iter_utils.ts";
import plural from "../plural.json" assert { type: "json" };

/** Count validator.
 *
 * @example
 * ```ts
 * import { CountValidator } from "https://deno.land/x/abstruct@$VERSION/validators/iterable/count.ts";
 * const validator = new CountValidator(3);
 * ```
 */
export class CountValidator extends ScalarValidator<Iterable<unknown>> {
  constructor(public of: number) {
    super();
  }

  override is(input: Iterable<unknown>): input is Iterable<unknown> {
    return count(input) === this.of;
  }

  override toString(): string {
    const pr = new Intl.PluralRules("en-US");
    const suffix = plural[pr.select(this.of)];

    return `${this.of} item${suffix}`;
  }
}
