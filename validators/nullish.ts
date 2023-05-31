// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isNullable } from "../deps.ts";
import { ScalarValidator } from "./utils.ts";

/** Nullish(`null` or `undefined`) validator.
 *
 * @example
 * ```ts
 * import { NullishValidator } from "https://deno.land/x/abstruct@$VERSION/validators/nullish.ts";
 * const validator = new NullishValidator();
 * ```
 */
export class NullishValidator
  extends ScalarValidator<unknown, undefined | null> {
  override is = isNullable;

  override toString(): string {
    return "nullish";
  }
}
