// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { BasicValidator } from "../utils.ts";
import { map } from "../../iter_utils.ts";
import { papplyRest } from "../../deps.ts";
import { type ValidationFailure, type Validator } from "../../types.ts";
import { fromPath } from "../../utils.ts";

/** Fixed array validator. It checks each item passes each {@link Validator}.
 *
 * @example
 * ```ts
 * import { FixedArrayValidator } from "https://deno.land/x/abstruct@$VERSION/validators/array/fixed_array.ts";
 * import { type Validator } from "https://deno.land/x/abstruct@$VERSION/types.ts";
 * declare const validator: Validator;
 * declare const validator2: Validator;
 * const fixedArrayValidator = new FixedArrayValidator(validator, validator2);
 * ```
 */
export class FixedArrayValidator<
  const in In extends readonly unknown[] = unknown[],
  const out RIn extends In = In,
> extends BasicValidator<In, RIn> {
  validators: readonly Validator[];

  constructor(
    ...validators:
      & { readonly [k in keyof In]: Readonly<Validator<In[k], RIn[k]>> }
      & { readonly [k in keyof RIn]: Readonly<Validator<RIn[k], RIn[k]>> }
  ) {
    super();
    this.validators = validators;
  }

  *validate(input: Readonly<In>): Iterable<ValidationFailure> {
    for (const [i, validator] of this.validators.entries()) {
      const value = input[i];
      const createError = papplyRest(fromPath, i);
      const iterable = validator.validate(value);

      yield* map(iterable, createError);
    }
  }

  override toString(): string {
    const repr = this.validators.map(String).join(", ");

    return `[${repr}]`;
  }
}
