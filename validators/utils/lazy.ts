// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { memoize } from "../../utils.ts";
import { type ValidationFailure, type Validator } from "../../types.ts";

/** Crate validator lazily.
 *
 * @example
 * ```ts
 * import { lazy } from "https://deno.land/x/abstruct@$VERSION/validators/utils/lazy.ts";
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
