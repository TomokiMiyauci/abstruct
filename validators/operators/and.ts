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

export class AndValidator<In = unknown, A extends In = In>
  extends Reporter<ValidationContext<In>>
  implements Validator<In, A> {
  validators: Validator<In, A>[];

  private constructor(validators: readonly Validator<In, A>[]) {
    super();
    this.validators = [...validators];
  }

  is(input: In): input is A {
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

  override toString(): string {
    const intl = new Intl.ListFormat("en");

    return intl.format(this.validators.map(String));
  }

  /** Create {@link AndValidator} instance. */
  static create<In, A extends In = In, In2 = unknown, A2 extends In2 = In2>(
    v1: Validator<In, A>,
    v2: Validator<In2 | A, A2>,
  ): AndValidator<In, A & A2>;
  static create<In, A extends In, In2, A2 extends In2, In3, A3 extends In3>(
    v1: Validator<In, A>,
    v2: Validator<In2 | A, A2>,
    v3: Validator<In3 | A & A2, A3>,
  ): AndValidator<In, A & A2 & A3>;
  static create<
    In,
    A extends In,
    In2,
    A2 extends In2,
    In3,
    A3 extends In3,
    In4,
    A4 extends In4,
  >(
    v1: Validator<In, A>,
    v2: Validator<In2 | A, A2>,
    v3: Validator<In3 | A & A2, A3>,
    v4: Validator<In4 | A & A2 & A3, A4>,
  ): AndValidator<In, A & A2 & A3 & A4>;
  static create<
    In,
    A extends In,
    In2,
    A2 extends In2,
    In3,
    A3 extends In3,
    In4,
    A4 extends In4,
    In5,
    A5 extends In5,
  >(
    v1: Validator<In, A>,
    v2: Validator<In2 | A, A2>,
    v3: Validator<In3 | A & A2, A3>,
    v4: Validator<In4 | A & A2 & A3, A4>,
    v5: Validator<In5 | A & A2 & A3 & A4, A5>,
  ): AndValidator<In, A & A2 & A3 & A4 & A5>;
  static create(...validators: readonly Validator[]): AndValidator;
  static create(...validators: readonly Validator[]) {
    return new AndValidator(validators);
  }
}
