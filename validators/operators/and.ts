// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isEmpty } from "../../deps.ts";
import { iter } from "../../iter_utils.ts";
import { type ValidationFailure, Validator } from "../../types.ts";

export class AndValidator<In, In_ extends Via, Via extends In = In & In_>
  implements Validator<In, In & In_ & Via> {
  validators: Validator[] = [];

  constructor(left: Validator<In, Via>, right: Validator<Via, In_>);
  constructor(...validators: Validator[]) {
    this.validators = validators;
  }

  is(input: In): input is In & In_ & Via {
    return isEmpty(this.validate(input));
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
