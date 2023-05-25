// deno-lint-ignore-file ban-types
// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isEmpty } from "../deps.ts";
import { curryR, fromPath } from "../utils.ts";
import { map } from "../iter_utils.ts";
import { type ValidationFailure, Validator } from "../types.ts";

export class PropertyKeyValidator<In_ extends string = string>
  implements Validator<{}, Record<In_, unknown>> {
  validator: Validator<string>;

  constructor(validator: Validator<string, In_>) {
    this.validator = validator as Validator<string>;
  }

  is(input: {}): input is Record<In_, unknown> {
    return isEmpty(this.validate(input));
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
