// deno-lint-ignore-file ban-types
// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isEmpty } from "../deps.ts";
import { curryR, fromPath } from "../utils.ts";
import { map } from "../iter_utils.ts";
import { type ValidationFailure, Validator } from "../types.ts";

export class ValueValidator<In, In_ extends In = In>
  implements Validator<{}, Record<string, In_>> {
  validator: Validator<In, In_>;

  constructor(validator: Validator<In, In_>) {
    this.validator = validator;
  }

  is(input: {}): input is Record<string, In_> {
    return isEmpty(this.validate(input));
  }

  *validate(input: {}): Iterable<ValidationFailure> {
    for (const [key, value] of Object.entries(input)) {
      const createError = curryR(fromPath, key);

      yield* map(this.validator.validate(value as In), createError);
    }
  }

  toString(): string {
    return `property value of ${this.validator}`;
  }
}
