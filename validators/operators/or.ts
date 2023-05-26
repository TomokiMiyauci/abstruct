// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isEmpty, maxBy } from "../../deps.ts";
import { displayOr } from "../utils.ts";
import {
  Reporter,
  ValidationContext,
  ValidationFailure,
  Validator,
} from "../../types.ts";
import { iter } from "../../iter_utils.ts";

export class OrValidator<in In = unknown, In_ extends In = In>
  extends Reporter<ValidationContext<In>>
  implements Validator<In, In_> {
  validators: [Validator<In, In_>, Validator<In, In_>, ...Validator<In, In_>[]];

  constructor(
    left: Validator<In, In_>,
    right: Validator<In, In_>,
    ...validations: Validator<In, In_>[]
  ) {
    super();
    this.validators = [left, right, ...validations];
  }

  is(input: In): input is In_ {
    return isEmpty(this.validate(input));
  }

  *validate(input: In): Iterable<ValidationFailure> {
    const failures: ValidationFailure[] = [];

    for (const validator of this.validators) {
      const iterable = validator.validate(input);
      const iterator = iter(iterable);
      const result = iterator.next();

      if (result.done) return;

      failures.push(result.value);
    }

    const context: ValidationContext<In> = { input };
    const instancePath = maxBy(
      failures,
      (failure) => failure.instancePath.length,
    )?.instancePath ?? [];
    const message = this.report(context);

    yield new ValidationFailure(message, { instancePath });
  }

  override toString(): string {
    return displayOr(...this.validators);
  }
}
