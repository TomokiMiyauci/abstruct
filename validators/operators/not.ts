// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { IsValidator } from "../utils.ts";
import { type Validator } from "../../types.ts";
import { print } from "../../utils.ts";

/** Validator for inversion.
 *
 * @example
 * ```ts
 * import { NotValidator } from "https://deno.land/x/abstruct@$VERSION/validators/operators/not.ts";
 * import { type Validator } from "https://deno.land/x/abstruct@$VERSION/types.ts";
 * declare const validator: Validator;
 * const notValidator = new NotValidator(validator);
 * ```
 */
export class NotValidator<In, A extends In = In>
  extends IsValidator<In, Exclude<In, A>> {
  validator: Validator<In, A>;

  constructor(validator: Validator<In, A>) {
    super();
    this.validator = validator;
  }

  is(input: In): input is Exclude<In, A> {
    return !this.validator.is(input);
  }

  override toString(): string {
    return `not ${print(this.validator)}`;
  }
}
