// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { BasicValidator } from "../utils.ts";
import { curryR } from "../../deps.ts";
import { map } from "../../iter_utils.ts";
import { entriesAll, fromPath, printProps } from "../../utils.ts";
import { ValidationFailure, type Validator } from "../../types.ts";

/** Object properties validator.
 *
 * @example
 * ```ts
 * import { PropertiesValidator } from "https://deno.land/x/abstruct@$VERSION/validators/object/properties.ts";
 * import { type Validator } from "https://deno.land/x/abstruct@$VERSION/types.ts";
 * declare const validator: Validator<string>;
 * const propertiesValidator = new PropertiesValidator({ key: validator, [Symbol()]: validator });
 * ```
 */
export class PropertiesValidator<
  const In extends Record<PropertyKey, unknown>,
  const RIn extends In = In,
> extends BasicValidator<In, RIn> {
  validators:
    & { [k in keyof In]: Validator<In[k], RIn[k]> }
    & { [k in keyof RIn]: Validator<RIn[k]> };

  constructor(
    validators:
      & { readonly [k in keyof In]: Readonly<Validator<In[k], RIn[k]>> }
      & { readonly [k in keyof RIn]: Readonly<Validator<RIn[k]>> },
  ) {
    super();
    this.validators = validators;
  }

  *validate(input: Readonly<In>): Iterable<ValidationFailure> {
    for (
      const [key, validator] of entriesAll(
        this.validators as Record<PropertyKey, Validator>,
      )
    ) {
      const value = input?.[key];
      const iterable = validator.validate(value);

      yield* map(iterable, curryR(fromPath, key));
    }
  }

  override toString(): string {
    return printProps(this.validators);
  }
}
