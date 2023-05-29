// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isValidDate, type ToPredicate } from "../../deps.ts";
import { ScalarValidator } from "../../utils.ts";

/** Valid `Date` validator.
 *
 * @example
 * ```ts
 * import { ValidDateValidator } from "https://deno.land/x/abstruct@$VERSION/validators/date/valid_date.ts";
 * const validator = new ValidDateValidator();
 * ```
 */
export class ValidDateValidator extends ScalarValidator<Date> {
  override is = isValidDate as ToPredicate<typeof isValidDate>;

  override toString(): string {
    return "valid Date";
  }
}
