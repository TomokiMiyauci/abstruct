// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { BasicValidator } from "../utils.ts";
import { maxBy } from "../../deps.ts";
import { ValidationFailure, Validator } from "../../types.ts";
import { iter } from "../../iter_utils.ts";

/** Or validator composer. It composes validators like Logical OR operator.
 *
 * @example
 * ```ts
 * import { OrValidator } from "https://deno.land/x/abstruct@$VERSION/validators/operators/or.ts";
 * import { type Validator } from "https://deno.land/x/abstruct@$VERSION/types.ts";
 * declare const v: Validator;
 * const validator = new OrValidator(v, v, v);
 * ```
 */
export class OrValidator<In = unknown, RIn extends In = In>
  extends BasicValidator<In, RIn> {
  validators: [Validator<In, RIn>, Validator<In, RIn>, ...Validator<In, RIn>[]];

  constructor(
    v1: Readonly<Validator<In, RIn>>,
    v2: Readonly<Validator<In, RIn>>,
    ...validations: Readonly<Validator<In, RIn>>[]
  ) {
    super();
    this.validators = [v1, v2, ...validations];
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

    const instancePath = maxBy(failures, instancePathLength)
      ?.instancePath ?? [];

    yield { message: "", instancePath };
  }

  override toString(): string {
    const intl = new Intl.ListFormat("en", { type: "disjunction" });

    return intl.format(this.validators.map(String));
  }
}

function instancePathLength(failure: Readonly<ValidationFailure>): number {
  return failure.instancePath.length;
}
