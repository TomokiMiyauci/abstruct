// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isEmpty } from "../../deps.ts";
import { iter, map } from "../../iter_utils.ts";
import { curryR, fromMessage } from "../../utils.ts";
import {
  Reporter,
  type ValidationContext,
  type ValidationFailure,
  Validator,
} from "../../types.ts";

export class AndValidator<In, In_ extends Via, Via extends In = In & In_>
  extends Reporter<ValidationContext<In>>
  implements Validator<In, In & In_ & Via> {
  validators: Validator[] = [];

  constructor(left: Validator<In, Via>, right: Validator<Via, In_>);
  constructor(...validators: Validator[]) {
    super();
    this.validators = validators;
  }

  is(input: In): input is In & In_ & Via {
    return isEmpty(this.validate(input));
  }

  *validate(input: In): Iterable<ValidationFailure> {
    for (const validator of this.validators) {
      const iterable = validator.validate(input);
      const iterator = iter(iterable);
      const result = iterator.next();

      if (result.done) continue;

      const message = this.report({ input });

      yield fromMessage(result.value, message);
      yield* map(iterable, curryR(fromMessage, message));
      return;
    }
  }
}
