// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { BasicValidator } from "../utils.ts";
import { filterKeys } from "../../deps.ts";
import { printProps } from "../../utils.ts";
import { ObjectValidator } from "../object.ts";
import { ValidationFailure, Validator } from "../../types.ts";

/** Optional object validator. It checks properties, but also passes if the property does not exist.
 *
 * @example
 * ```ts
 * import { ObjectValidator } from "https://deno.land/x/abstruct@$VERSION/validators/object.ts";
 * import { type Validator } from "https://deno.land/x/abstruct@$VERSION/types.ts";
 * declare const validator: Validator<string>;
 * const objectValidator = new ObjectValidator({ key: validator, [Symbol()]: validator });
 * ```
 */
export class OptionalValidator<
  In extends Record<PropertyKey, unknown>,
  RIn extends In = In,
> extends BasicValidator<Partial<In>, Partial<RIn>> {
  constructor(
    public validators:
      & { [k in keyof In]: Validator<In[k], RIn[k]> }
      & { [k in keyof RIn]: Validator<RIn[k]> },
  ) {
    super();
  }

  *validate(input: Partial<In>): Iterable<ValidationFailure> {
    const validators = filterKeys(
      this.validators,
      Reflect.has.bind(this, input),
    ) as Record<string, Validator>;

    yield* new ObjectValidator(validators).validate(input as In);
  }

  override toString(): string {
    return `optional ${printProps(this.validators)}`;
  }
}
