// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { IsValidator } from "../utils.ts";
import { isEmpty } from "../../deps.ts";

/** Empty validator. It checks the items is empty.
 *
 * @example
 * ```ts
 * import { EmptyValidator } from "https://deno.land/x/abstruct@$VERSION/validators/iterable/empty.ts";
 * const validator = new EmptyValidator();
 * ```
 */
export class EmptyValidator extends IsValidator<Iterable<unknown>> {
  override is = isEmpty;

  override toString(): string {
    return "empty";
  }
}
