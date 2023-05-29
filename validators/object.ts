// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isEmpty } from "../deps.ts";
import { map } from "../iter_utils.ts";
import { curryR, entriesAll, fromPath, printProps } from "../utils.ts";
import { ValidationFailure, Validator } from "../types.ts";

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
> implements Validator<In, A> {
  constructor(
    public validators:
      & { [k in keyof In]: Validator<In[k], A[k]> }
      & { [k in keyof A]: Validator<A[k]> },
  ) {}

  is(input: In): input is A {
    return isEmpty(this.validate(input));
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

  toString(): string {
    return printProps(this.validators);
  }
}
