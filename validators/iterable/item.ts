// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { curryR, fromPath } from "../../utils.ts";
import { enumerate, map } from "../../iter_utils.ts";
import {
  Assert,
  AssertiveValidator,
  Validation,
  ValidationError,
} from "../../types.ts";

export class ItemValidator<In = unknown, In_ extends In = In>
  implements AssertiveValidator<Iterable<In>, Iterable<In_>> {
  declare [Assert.symbol]: Iterable<In_>;
  constructor(public readonly validator: Validation<In, In_>) {}

  *validate(input: Iterable<In>): Iterable<ValidationError> {
    for (const [i, el] of enumerate(input)) {
      const iterable = this.validator.validate(el);
      const createError = curryR(fromPath, `${i}`);

      yield* map(iterable, createError);
    }
  }
}
