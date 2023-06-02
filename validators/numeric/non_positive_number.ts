// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { IsValidator } from "../utils.ts";
import { isNonPositiveNumber, ToPredicate } from "../../deps.ts";

/** Non-positive number validator.
 *
 * @example
 * ```ts
 * import { NonPositiveNumberValidator } from "https://deno.land/x/abstruct@$VERSION/validators/numeric/non_positive_number.ts";
 * const validator = new NonPositiveNumberValidator();
 * ```
 */
export class NonPositiveNumberValidator extends IsValidator<number | bigint> {
  is = isNonPositiveNumber as ToPredicate<typeof isNonPositiveNumber>;

  override toString(): string {
    return "non-positive number";
  }
}
