// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { IsValidator } from "../utils.ts";
import { ToPredicate } from "../../deps.ts";

/** Integer validator.
 *
 * @example
 * ```ts
 * import { IntegerValidator } from "https://deno.land/x/abstruct@$VERSION/validators/number/integer.ts";
 * const validator = new IntegerValidator();
 * ```
 */
export class IntegerValidator extends IsValidator<number> {
  is = Number.isInteger as ToPredicate<(input: number) => boolean>;

  override toString(): string {
    return "integer";
  }
}
