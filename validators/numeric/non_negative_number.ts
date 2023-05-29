// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ScalarValidator } from "../../utils.ts";
import { isNonNegativeNumber, ToPredicate } from "../../deps.ts";

/** Non-negative number validator.
 *
 * @example
 * ```ts
 * import { NonNegativeNumberValidator } from "https://deno.land/x/abstruct@$VERSION/validators/numeric/non_negative_number.ts";
 * const validator = new NonNegativeNumberValidator();
 * ```
 */
export class NonNegativeNumberValidator
  extends ScalarValidator<number | bigint> {
  is = isNonNegativeNumber as ToPredicate<typeof isNonNegativeNumber>;

  override toString() {
    return "non-negative number";
  }
}
