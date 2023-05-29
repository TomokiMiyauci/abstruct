// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isSingle } from "../../deps.ts";
import { ScalarValidator } from "../../utils.ts";

/** Single validator. It checks items is single.
 *
 * @example
 * ```ts
 * import { SingleValidator } from "https://deno.land/x/abstruct@$VERSION/validators/iterable/single.ts";
 * const validator = new SingleValidator();
 * ```
 */
export class SingleValidator extends ScalarValidator<Iterable<unknown>> {
  override is = isSingle;

  override toString(): string {
    return "single";
  }
}
