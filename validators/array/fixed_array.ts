// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { map } from "../../iter_utils.ts";
import { isEmpty } from "../../deps.ts";
import { ValidationFailure, Validator } from "../../types.ts";
import { curryR, fromPath } from "../../utils.ts";

export class FixedArrayValidator<
  const In extends readonly unknown[] = unknown[],
  const In_ extends In = In,
> implements Validator<In, In_> {
  validators: readonly Validator[];

  constructor(
    ...validators:
      & { [k in keyof In]: Validator<In[k], In_[k]> }
      & { [k in keyof In_]: Validator<In_[k]> }
  ) {
    this.validators = validators;
  }

  is(input: In): input is In_ {
    return isEmpty(this.validate(input));
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

  toString(): string {
    return `[${this.validators.map(String).join(", ")}]`;
  }
}
