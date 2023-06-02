// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { IsValidator } from "../utils.ts";
import { print } from "../../utils.ts";

/** Validator equivalent to greater than or equal(`<=`) operator.
 *
 * @example
 * ```ts
 * import { GreaterThanOrEqualValidator } from "https://deno.land/x/abstruct@$VERSION/validators/operators/greater_than_or_equal.ts";
 * const validator = new GreaterThanOrEqualValidator(8);
 * ```
 */
export class GreaterThanOrEqualValidator<In> extends IsValidator<In> {
  constructor(public base: In) {
    super();
  }

  override is(input: In): input is In {
    return this.base <= input;
  }

  override toString(): string {
    return `greater than or equal to ${print(this.base)}`;
  }
}
