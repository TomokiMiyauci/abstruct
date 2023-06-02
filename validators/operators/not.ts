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
export class NotValidator<In, RIn extends In = In>
  extends IsValidator<In, Exclude<In, RIn>> {
  validator: Validator<In, RIn>;

  constructor(validator: Readonly<Validator<In, RIn>>) {
    super();
    this.validator = validator;
  }

  is(input: In): input is Exclude<In, RIn> {
    return !this.validator.is(input);
  }

  override toString(): string {
    return `not ${print(this.validator)}`;
  }
}
