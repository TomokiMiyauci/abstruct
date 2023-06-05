// deno-lint-ignore-file ban-types
// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { BasicValidator } from "../utils.ts";
import { papplyRest } from "../../deps.ts";
import { fromPath, print } from "../../utils.ts";
import { map } from "../../iter_utils.ts";
import { type ValidationFailure, type Validator } from "../../types.ts";

/** Property key validator. It checks to pass all property key.
 *
 * @example
 * ```ts
 * import { PropertyKeyValidator } from "https://deno.land/x/abstruct@$VERSION/validators/object/property_key.ts";
 * import { type Validator } from "https://deno.land/x/abstruct@$VERSION/types.ts";
 * declare const validator: Validator<string>;
 * const keyValidator = new PropertyKeyValidator(validator);
 * ```
 */
export class PropertyKeyValidator<T extends string = string>
  extends BasicValidator<object, Record<T, unknown>> {
  validator: Validator<string, T>;

  constructor(validator: Readonly<Validator<string, T>>) {
    super();
    this.validator = validator;
  }

  *validate(input: object): Iterable<ValidationFailure> {
    for (const key in input) {
      const createError = papplyRest(fromPath, key);

      yield* map(this.validator.validate(key), createError);
    }
  }

  override toString(): string {
    return `key of ${print(this.validator)}`;
  }
}
