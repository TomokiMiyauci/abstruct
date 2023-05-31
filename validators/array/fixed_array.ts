// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { BasicValidator } from "../utils.ts";
import { map } from "../../iter_utils.ts";
import { curryR } from "../../deps.ts";
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
  const out A extends In = In,
> extends BasicValidator<In, A> {
  validators: readonly Validator[];

  constructor(
    ...validators:
      & { [k in keyof In]: Validator<In[k], A[k]> }
      & { [k in keyof A]: Validator<A[k], A[k]> }
  ) {
    super();
    this.validators = validators;
  }

  *validate(input: In): Iterable<ValidationFailure> {
    for (const [i, validator] of this.validators.entries()) {
      const key = i.toString();
      const value = input[i];
      const createError = curryR(fromPath, key);
      const iterable = validator.validate(value);

      yield* map(iterable, createError);
    }
  }

  override toString(): string {
    const repr = this.validators.map(String).join(", ");

    return `[${repr}]`;
  }
}
