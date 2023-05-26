// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import {
  Reporter,
  type ValidationContext,
  ValidationFailure,
  type Validator,
} from "../../types.ts";

export class NotValidator<in In = unknown, In_ extends In = In>
  extends Reporter<ValidationContext<In>>
  implements Validator<In, In_> {
  validator: Validator<In, In_>;

  constructor(validator: Validator<In, In_>) {
    super();
    this.validator = validator;
  }

  is(input: In): input is In_ {
    return !this.validator.is(input);
  }

  *validate(input: In): Iterable<ValidationFailure> {
    if (!this.is(input)) yield new ValidationFailure(this.report({ input }));
  }

  override toString(): string {
    return `not ${this.validator}`;
  }
}
