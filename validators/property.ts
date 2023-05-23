// deno-lint-ignore-file ban-types
// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { curryR, fromPath } from "../utils.ts";
import { map } from "../iter_utils.ts";
import {
  Assert,
  AssertiveValidator,
  Validation,
  type ValidationFailure,
  Validator,
} from "../types.ts";

export class PropertyValidator<In_ extends string = string>
  implements AssertiveValidator<{}, Record<In_, unknown>> {
  declare [Assert.symbol]: Record<In_, unknown>;
  validator: Validation<string>;

  constructor(validator: Validation<string, In_>) {
    this.validator = validator as Validator<string>;
  }

  *validate(input: {}): Iterable<ValidationFailure> {
    for (const key in input) {
      const createError = curryR(fromPath, key);

      yield* map(this.validator.validate(key), createError);
    }
  }

  toString(): string {
    return `key of ${this.validator}`;
  }
}
