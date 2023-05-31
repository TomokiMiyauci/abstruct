// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ScalarValidator } from "../utils.ts";
import { print } from "../../utils.ts";

/** Validator equivalent to less than or equal to(`>=`) operator.
 *
 * @example
 * ```ts
 * import { LessThanOrEqualValidator } from "https://deno.land/x/abstruct@$VERSION/validators/operators/less_than_or_equal.ts";
 * const validator = new LessThanOrEqualValidator(255);
 * ```
 */
export class LessThanOrEqualValidator<In> extends ScalarValidator<In> {
  constructor(public base: In) {
    super();
  }

  override is(input: In): input is In {
    return this.base >= input;
  }

  override toString(): string {
    return `less than or equal to ${print(this.base)}`;
  }
}
