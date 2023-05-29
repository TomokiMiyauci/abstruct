// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isEmpty } from "../deps.ts";
import { map } from "../iter_utils.ts";
import { curryR, fromPath } from "../utils.ts";
import { ValidationFailure, Validator } from "../types.ts";

export class ObjectValidator<
  const In extends Record<string, unknown>,
  const In_ extends In = In,
> implements Validator<In, In_> {
  constructor(
    public validators:
      & { [k in keyof In]: Validator<In[k], In_[k]> }
      & { [k in keyof In_]: Validator<In_[k]> },
  ) {}

  is(input: In): input is In_ {
    return isEmpty(this.validate(input));
  }

  *validate(input: In): Iterable<ValidationFailure> {
    for (const [key, validator] of Object.entries(this.validators)) {
      const value = input?.[key];
      const iterable = validator.validate(value as never);

      yield* map(iterable, curryR(fromPath, key));
    }
  }
}
