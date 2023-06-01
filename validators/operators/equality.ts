// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { IsValidator } from "../utils.ts";
import { print } from "../../utils.ts";

/** Validator equivalent to strict equality(`===`) operator.
 *
 * @example
 * ```ts
 * import { EqualityValidator } from "https://deno.land/x/abstruct@$VERSION/validators/operators/equality.ts";
 * const validator = new EqualityValidator(0);
 * ```
 */
export class EqualityValidator<const A = unknown>
  extends IsValidator<unknown, A> {
  constructor(public value: A) {
    super();
  }

  override is(input: unknown): input is A {
    return input === this.value;
  }

  override toString(): string {
    return print(this.value);
  }
}
