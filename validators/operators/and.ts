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

export class AndValidator<
  In,
  A extends In = In,
  In2 = unknown,
  A2 extends In2 = In2,
> extends Reporter<ValidationContext<In>> implements Validator<In, A & A2> {
  validators: [Validator<In, A>, Validator<In2, A2>];

  constructor(left: Validator<In, A>, right: Validator<In2 | A, A2>) {
    super();
    this.validators = [left, right];
  }

  is(input: In): input is A & A2 {
    return isEmpty(this.validate(input));
  }

  *validate(input: In): Iterable<ValidationFailure> {
    for (const validator of this.validators) {
      const iterable = validator.validate(input as In & In2);
      const iterator = iter(iterable);
      const result = iterator.next();

      if (result.done) continue;

      const message = this.report({ input });

      yield fromMessage(result.value, message);
      yield* map(iterable, curryR(fromMessage, message));
      return;
    }
  }

  override toString(): string {
    const intl = new Intl.ListFormat("en");

    return intl.format(this.validators.map(String));
  }
}
