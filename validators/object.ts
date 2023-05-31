// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { BasicValidator } from "./utils.ts";
import { curryR } from "../deps.ts";
import { map } from "../iter_utils.ts";
import { entriesAll, fromPath, printProps } from "../utils.ts";
import { ValidationFailure, type Validator } from "../types.ts";

/** Object validator.
 *
 * @example
 * ```ts
 * import { ObjectValidator } from "https://deno.land/x/abstruct@$VERSION/validators/object.ts";
 * import { type Validator } from "https://deno.land/x/abstruct@$VERSION/types.ts";
 * declare const validator: Validator<string>;
 * const objectValidator = new ObjectValidator({ key: validator, [Symbol()]: validator });
 * ```
 */
export class ObjectValidator<
  const In extends Record<PropertyKey, unknown>,
  const A extends In = In,
> extends BasicValidator<In, A> {
  constructor(
    public validators:
      & { [k in keyof In]: Validator<In[k], A[k]> }
      & { [k in keyof A]: Validator<A[k]> },
  ) {
    super();
  }

  *validate(input: In): Iterable<ValidationFailure> {
    for (
      const [key, validator] of entriesAll(
        this.validators as Record<PropertyKey, Validator>,
      )
    ) {
      const value = input?.[key];
      const iterable = validator.validate(value);

      yield* map(iterable, curryR(fromPath, key.toString()));
    }
  }

  override toString(): string {
    return printProps(this.validators);
  }
}
