// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { IsValidator } from "../utils.ts";
import { print } from "../../utils.ts";

/** Validator equivalent to less than(`>`) operator.
 *
 * @example
 * ```ts
 * import { LessThanValidator } from "https://deno.land/x/abstruct@$VERSION/validators/operators/less_than.ts";
 * const validator = new LessThanValidator(256);
 * ```
 */
export class LessThanValidator<In> extends IsValidator<In> {
  constructor(public base: In) {
    super();
  }

  override is(input: In): input is In {
    return this.base > input;
  }

  override toString(): string {
    return `less than ${print(this.base)}`;
  }
}
