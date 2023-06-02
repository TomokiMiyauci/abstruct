// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { BasicValidator } from "../utils.ts";
import { iterIter } from "../../iter_utils.ts";
import { type ValidationFailure, Validator } from "../../types.ts";

/** And validator composer. It composes validators like Logical AND operator.
 *
 * @example
 * ```ts
 * import { AndValidator } from "https://deno.land/x/abstruct@$VERSION/validators/operators/and.ts";
 * import { type Validator } from "https://deno.land/x/abstruct@$VERSION/types.ts";
 * declare const v: Validator;
 * const validator = AndValidator.create(v, v, v)
 * ```
 */
export class AndValidator<In = unknown, RIn extends In = In>
  extends BasicValidator<In, RIn> {
  validators: Validator<In, RIn>[];

  constructor(validators: readonly Readonly<Validator<In, RIn>>[]) {
    super();
    this.validators = [...validators];
  }

  *validate(input: In): Iterable<ValidationFailure> {
    for (const validator of this.validators) {
      const iterable = validator.validate(input);
      const iterator = iterIter(iterable);
      const result = iterator.next();

      if (result.done) continue;

      yield result.value;
      yield* iterator;
      return;
    }
  }

  override toString(): string {
    const intl = new Intl.ListFormat("en");

    return intl.format(this.validators.map(String));
  }

  /** Create {@link AndValidator} instance. */
  static create<In, RIn extends In = In, In2 = unknown, RIn2 extends In2 = In2>(
    v1: Validator<In, RIn>,
    v2: Validator<In2 | RIn, RIn2>,
  ): AndValidator<In, RIn & RIn2>;
  static create<
    In,
    RIn extends In,
    In2,
    RIn2 extends In2,
    In3,
    RIn3 extends In3,
  >(
    v1: Validator<In, RIn>,
    v2: Validator<In2 | RIn, RIn2>,
    v3: Validator<In3 | RIn & RIn2, RIn3>,
  ): AndValidator<In, RIn & RIn2 & RIn3>;
  static create<
    In,
    RIn extends In,
    In2,
    RIn2 extends In2,
    In3,
    RIn3 extends In3,
    In4,
    RIn4 extends In4,
  >(
    v1: Validator<In, RIn>,
    v2: Validator<In2 | RIn, RIn2>,
    v3: Validator<In3 | RIn & RIn2, RIn3>,
    v4: Validator<In4 | RIn & RIn2 & RIn3, RIn4>,
  ): AndValidator<In, RIn & RIn2 & RIn3 & RIn4>;
  static create<
    In,
    RIn extends In,
    In2,
    RIn2 extends In2,
    In3,
    RIn3 extends In3,
    In4,
    RIn4 extends In4,
    In5,
    RIn5 extends In5,
  >(
    v1: Validator<In, RIn>,
    v2: Validator<In2 | RIn, RIn2>,
    v3: Validator<In3 | RIn & RIn2, RIn3>,
    v4: Validator<In4 | RIn & RIn2 & RIn3, RIn4>,
    v5: Validator<In5 | RIn & RIn2 & RIn3 & RIn4, RIn5>,
  ): AndValidator<In, RIn & RIn2 & RIn3 & RIn4 & RIn5>;
  static create(...validators: readonly Validator[]) {
    return new AndValidator(validators);
  }
}
