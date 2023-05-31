// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ScalarValidator } from "../utils.ts";
import { isNotEmpty } from "../../deps.ts";

/** Non-Empty validator. It checks items is non-empty.
 *
 * @example
 * ```ts
 * import { NonEmptyValidator } from "https://deno.land/x/abstruct@$VERSION/validators/iterable/non_empty.ts";
 * const validator = new NonEmptyValidator();
 * ```
 */
export class NonEmptyValidator extends ScalarValidator<Iterable<unknown>> {
  override is = isNotEmpty;

  override toString(): string {
    return "non-empty";
  }
}
