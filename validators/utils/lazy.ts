// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { memoize, print } from "../../utils.ts";
import { type ValidationFailure, type Validator } from "../../types.ts";

/** Crate validator lazily.  */
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
    toString(): string {
      return print($fn());
    },
  };

  return validator;
}
