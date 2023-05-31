// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ScalarValidator } from "../utils.ts";
import { print } from "../../utils.ts";

/** Validator equivalent to strict inequality(`!==`) operator.
 *
 * @example
 * ```ts
 * import { InequalityValidator } from "https://deno.land/x/abstruct@$VERSION/validators/operators/inequality.ts";
 * const validator = new InequalityValidator(0);
 * ```
 */
export class InequalityValidator extends ScalarValidator {
  constructor(public value: unknown) {
    super();
  }

  override is(input: unknown): input is unknown {
    return input !== this.value;
  }

  override toString(): string {
    return `not ${print(this.value)}`;
  }
}
