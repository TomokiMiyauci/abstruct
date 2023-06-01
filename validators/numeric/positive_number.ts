// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { IsValidator } from "../utils.ts";
import { isPositiveNumber, ToPredicate } from "../../deps.ts";

/** Positive number validator.
 *
 * @example
 * ```ts
 * import { PositiveNumberValidator } from "https://deno.land/x/abstruct@$VERSION/validators/numeric/positive_number.ts";
 * const validator = new PositiveNumberValidator();
 * ```
 */
export class PositiveNumberValidator extends IsValidator<number | bigint> {
  is = isPositiveNumber as ToPredicate<typeof isPositiveNumber>;

  override toString(): string {
    return "positive number";
  }
}
