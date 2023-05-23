// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { iter } from "../iter_utils.ts";
import {
  type Assert,
  type AssertiveValidator,
  type Validation,
  type ValidationFailure,
} from "../types.ts";

export class AndValidator<In, In_ extends Via, Via extends In = In & In_>
  implements AssertiveValidator<In, In & In_ & Via> {
  declare [Assert.symbol]: In & In_ & Via;
  validators: Validation[] = [];

  constructor(left: Validation<In, Via>, right: Validation<Via, In_>);
  constructor(...validators: Validation[]) {
    this.validators = validators;
  }

  *validate(input: In): Iterable<ValidationFailure> {
    for (const validator of this.validators) {
      const iterable = validator.validate(input);
      const result = iter(iterable);

      if (result.done) continue;

      yield result.value;
      yield* iterable;
      return;
    }
  }
}
