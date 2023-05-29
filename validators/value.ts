// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isEmpty } from "../deps.ts";
import { curryR, fromPath, print } from "../utils.ts";
import { map } from "../iter_utils.ts";
import { type ValidationFailure, Validator } from "../types.ts";

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
export class ValueValidator<In, A extends In = In>
  implements Validator<Record<string, In>, Record<string, A>> {
  validator: Validator<In, A>;

  constructor(validator: Validator<In, A>) {
    this.validator = validator;
  }

  is(input: Record<string, In>): input is Record<string, A> {
    return isEmpty(this.validate(input));
  }

  *validate(input: Record<string, In>): Iterable<ValidationFailure> {
    for (const [key, value] of Object.entries(input)) {
      const createError = curryR(fromPath, key);

      yield* map(this.validator.validate(value), createError);
    }
  }

  toString(): string {
    return `value of ${print(this.validator)}`;
  }
}
