// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ValidationFailure, type Validator } from "../types.ts";
import { isEmpty, memoize } from "../deps.ts";

export abstract class IsValidator<In = unknown, A extends In = In>
  implements Validator<In, A> {
  abstract is(input: In): input is A;

  *validate(input: In): Iterable<ValidationFailure> {
    if (!this.is(input)) yield new ValidationFailure();
  }
}

export abstract class BasicValidator<In = unknown, A extends In = In>
  implements Validator<In, A> {
  is(input: In): input is A {
    return isEmpty(this.validate(input));
  }

  abstract validate(input: In): Iterable<ValidationFailure>;
}

/** Crate validator lazily.
 *
 * @example
 * ```ts
 * import { lazy } from "https://deno.land/x/abstruct@$VERSION/validators/utils.ts";
 * import { type Validator } from "https://deno.land/x/abstruct@$VERSION/types.ts";
 * declare const v: Validator;
 * const validator = lazy(() => v);
 * ```
 */
export function lazy<In, A extends In = In>(
  fn: () => Validator<In, A>,
): Validator<In, A> {
  const $fn = memoize(fn);
  const validator = {
    is: (input: In): input is A => {
      return $fn().is(input);
    },
    *validate(input: In): Iterable<ValidationFailure> {
      yield* $fn().validate(input);
    },
    toString: (): string => {
      return $fn().toString();
    },
  };

  return validator;
}
