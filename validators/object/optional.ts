// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { filterKeys } from "../../deps.ts";
import { DictionaryValidator } from "./dictionary.ts";
import {
  Assert,
  AssertiveValidator,
  Validation,
  ValidationError,
} from "../../types.ts";

export class OptionalValidator<
  In extends Record<string, unknown> = Record<string, unknown>,
  In_ extends In = In,
> implements AssertiveValidator<Partial<In>, Partial<In_>> {
  declare [Assert.symbol]: Partial<In_>;
  constructor(
    public validators:
      & { [k in keyof In]: Validation<In[k], In_[k]> }
      & { [k in keyof In_]: Validation<In_[k]> },
  ) {}

  *validate(input: Partial<In>): Iterable<ValidationError> {
    const validators = filterKeys(
      this.validators,
      hasInput,
    ) as typeof this.validators;

    function hasInput(key: string): boolean {
      return key in input;
    }

    yield* new DictionaryValidator<In, In_>(validators).validate(input as In);
  }
}
