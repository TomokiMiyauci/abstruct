// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { inspect, ScalarValidator } from "../../utils.ts";

/** Validator equivalent to greater than(`<`) operator.
 *
 * @example
 * ```ts
 * import { GreaterThanValidator } from "https://deno.land/x/abstruct@$VERSION/validators/operators/greater_than.ts";
 * const validator = new GreaterThanValidator(8);
 * ```
 */
export class GreaterThanValidator<In> extends ScalarValidator<In> {
  constructor(public base: In) {
    super();
  }

  override is(input: In): input is In {
    return this.base < input;
  }

  override toString(): string {
    return `greater than ${inspect(this.base)}`;
  }
}
