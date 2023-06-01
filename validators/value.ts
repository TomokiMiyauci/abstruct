// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { BasicValidator } from "./utils.ts";
import { curryR } from "../deps.ts";
import { fromPath, print } from "../utils.ts";
import { map } from "../iter_utils.ts";
import { type ValidationFailure, type Validator } from "../types.ts";

/**  Property value validator. It checks to pass all property value.
 *
 * @example
 * ```ts
 * import { ValueValidator } from "https://deno.land/x/abstruct@$VERSION/validators/value.ts";
 * import { type Validator } from "https://deno.land/x/abstruct@$VERSION/types.ts";
 * declare const validator: Validator<string>;
 * const keyValidator = new ValueValidator(validator);
 * ```
 */
export class ValueValidator<In, RIn extends In = In>
  extends BasicValidator<Record<string, In>, Record<string, RIn>> {
  validator: Validator<In, RIn>;

  constructor(validator: Validator<In, RIn>) {
    super();
    this.validator = validator;
  }

  *validate(input: Record<string, In>): Iterable<ValidationFailure> {
    for (const [key, value] of Object.entries(input)) {
      const createError = curryR(fromPath, key);

      yield* map(this.validator.validate(value), createError);
    }
  }

  override toString(): string {
    return `value of ${print(this.validator)}`;
  }
}
