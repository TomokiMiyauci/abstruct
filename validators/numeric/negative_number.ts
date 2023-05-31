// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ScalarValidator } from "../utils.ts";
import { isNegativeNumber, ToPredicate } from "../../deps.ts";

/** Negative number validator.
 *
 * @example
 * ```ts
 * import { NegativeNumberValidator } from "https://deno.land/x/abstruct@$VERSION/validators/numeric/negative_number.ts";
 * const validator = new NegativeNumberValidator();
 * ```
 */
export class NegativeNumberValidator extends ScalarValidator<number | bigint> {
  is = isNegativeNumber as ToPredicate<typeof isNegativeNumber>;

  override toString(): string {
    return "negative number";
  }
}
