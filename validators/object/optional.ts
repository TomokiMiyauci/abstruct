// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { filterKeys, isEmpty } from "../../deps.ts";
import { ObjectValidator } from "../object.ts";
import { ValidationFailure, Validator } from "../../types.ts";

export class OptionalValidator<
  In extends Record<string, unknown> = Record<string, unknown>,
  In_ extends In = In,
> implements Validator<Partial<In>, Partial<In_>> {
  constructor(
    public validators:
      & { [k in keyof In]: Validator<In[k], In_[k]> }
      & { [k in keyof In_]: Validator<In_[k]> },
  ) {}

  is(input: Partial<In>): input is Partial<In_> {
    return isEmpty(this.validate(input));
  }

  *validate(input: Partial<In>): Iterable<ValidationFailure> {
    const validators = filterKeys(
      this.validators,
      hasInput,
    ) as typeof this.validators;

    function hasInput(key: string): boolean {
      return key in input;
    }

    yield* new ObjectValidator<In, In_>(validators).validate(input as In);
  }
}
