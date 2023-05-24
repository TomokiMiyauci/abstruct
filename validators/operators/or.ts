// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isEmpty } from "../../deps.ts";
import { displayOr, shouldBe } from "../utils.ts";
import { Reporter, ValidationFailure, Validator } from "../../types.ts";
import { iter } from "../../iter_utils.ts";

export interface ReportContext<In = unknown> {
  input: In;
}

export class OrValidator<in In = unknown, In_ extends In = In>
  extends Reporter<ReportContext<In>>
  implements Validator<In, In_> {
  validators: [Validator<In, In_>, Validator<In, In_>, ...Validator<In, In_>[]];

  constructor(
    left: Validator<In, In_>,
    right: Validator<In, In_>,
    ...validations: Validator<In, In_>[]
  ) {
    super();
    this.expect(shouldBe);
    this.validators = [left, right, ...validations];
  }

  is(input: In): input is In_ {
    return isEmpty(this.validate(input));
  }

  *validate(input: In): Iterable<ValidationFailure> {
    for (const validator of this.validators) {
      const iterable = validator.validate(input);

      if (iter(iterable).next().done) return;
    }

    const context: ReportContext<In> = { input };
    const message = this.report(context);

    yield new ValidationFailure(message);
  }

  override toString(): string {
    return displayOr(...this.validators);
  }
}
