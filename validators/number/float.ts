// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { type ToPredicate } from "../../deps.ts";
import { ScalarValidator } from "../../utils.ts";

/** Float validator.
 *
 * @example
 * ```ts
 * import { FloatValidator } from "https://deno.land/x/abstruct@$VERSION/validators/number/float.ts";
 * const validator = new FloatValidator();
 * ```
 */
export class FloatValidator extends ScalarValidator<number> {
  is = isFloat as ToPredicate<typeof isFloat>;

  override toString(): string {
    return "float";
  }
}

/** Whether the number is float or not. */
export function isFloat(input: number): boolean {
  return Number.isFinite(input) && !Number.isInteger(input);
}
