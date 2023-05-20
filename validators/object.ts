// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { map } from "../iter_utils.ts";
import { fromPath, partialR } from "../utils.ts";
import {
  Assert,
  AssertiveValidator,
  Validation,
  ValidationError,
} from "../types.ts";

export class ObjectValidator<
  const In extends Record<string, unknown>,
  const In_ extends In = In,
> implements AssertiveValidator<In, In_> {
  declare [Assert.symbol]: In_;
  constructor(
    public validators:
      & { [k in keyof In]: Validation<In[k], In_[k]> }
      & { [k in keyof In_]: Validation<In_[k]> },
  ) {}

  *validate(input: In): Iterable<ValidationError> {
    for (const [key, validator] of Object.entries(this.validators)) {
      const value = input[key];
      const iterable = validator.validate(value as never);

      yield* map(iterable, partialR(fromPath, key));
    }
  }
}
