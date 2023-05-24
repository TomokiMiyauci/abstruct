// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isEmpty } from "../../deps.ts";
import { curryR, fromPath } from "../../utils.ts";
import { enumerate, map } from "../../iter_utils.ts";
import { type ValidationFailure, Validator } from "../../types.ts";

export class ItemValidator<In = unknown, In_ extends In = In>
  implements Validator<Iterable<In>, Iterable<In_>> {
  constructor(public readonly validator: Validator<In, In_>) {}

  is(input: Iterable<In>): input is Iterable<In_> {
    return isEmpty(this.validate(input));
  }

  *validate(input: Iterable<In>): Iterable<ValidationFailure> {
    for (const [i, el] of enumerate(input)) {
      const iterable = this.validator.validate(el);
      const createError = curryR(fromPath, `${i}`);

      yield* map(iterable, createError);
    }
  }
}
