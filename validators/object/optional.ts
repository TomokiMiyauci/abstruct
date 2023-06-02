// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { BasicValidator } from "../utils.ts";
import { filterKeys } from "../../deps.ts";
import { printProps } from "../../utils.ts";
import { PropertiesValidator } from "./properties.ts";
import { ValidationFailure, Validator } from "../../types.ts";

/** Optional object validator. It checks properties, but also passes if the property does not exist.
 *
 * @example
 * ```ts
 * import { OptionalValidator } from "https://deno.land/x/abstruct@$VERSION/validators/object/optional.ts";
 * import { type Validator } from "https://deno.land/x/abstruct@$VERSION/types.ts";
 * declare const validator: Validator<string>;
 * const optionalValidator = new OptionalValidator({ key: validator, [Symbol()]: validator });
 * ```
 */
export class OptionalValidator<
  T extends Record<PropertyKey, unknown>,
  U extends T = T,
> extends BasicValidator<Partial<T>, Partial<U>> {
  validators:
    & { [k in keyof T]: Validator<T[k], U[k]> }
    & { [k in keyof U]: Validator<U[k]> };
  constructor(
    validators:
      & { readonly [k in keyof T]: Readonly<Validator<T[k], U[k]>> }
      & { readonly [k in keyof U]: Readonly<Validator<U[k]>> },
  ) {
    super();
    this.validators = validators;
  }

  *validate(input: Readonly<Partial<T>>): Iterable<ValidationFailure> {
    const validators = filterKeys(
      this.validators,
      Reflect.has.bind(this, input),
    ) as Record<string, Validator>;

    yield* new PropertiesValidator(validators).validate(input as T);
  }

  override toString(): string {
    return `optional ${printProps(this.validators)}`;
  }
}
