// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { map } from "../../iter_utils.ts";
import { curryR, fromPath } from "../../utils.ts";
import {
  Assert,
  AssertiveValidator,
  Validation,
  ValidationFailure,
} from "../../types.ts";

export class DictionaryValidator<
  const In extends Record<string, unknown>,
  const In_ extends In = In,
> implements AssertiveValidator<In, In_> {
  declare [Assert.symbol]: In_;
  constructor(
    public validators:
      & { [k in keyof In]: Validation<In[k], In_[k]> }
      & { [k in keyof In_]: Validation<In_[k]> },
  ) {}

  *validate(input: In): Iterable<ValidationFailure> {
    for (const [key, validator] of Object.entries(this.validators)) {
      const value = input?.[key];
      const iterable = validator.validate(value as never);

      yield* map(iterable, curryR(fromPath, key));
    }
  }
}
