// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { type Constructor } from "../deps.ts";
import { AssertiveScalarValidator } from "../utils.ts";
import { type Display } from "../types.ts";

// deno-lint-ignore ban-types
function message(this: Display, { input }: { input: {} }): string {
  return `should be ${this}, but ${input.constructor.name}`;
}

export class InstanceValidator<T extends Constructor = Constructor> extends // deno-lint-ignore ban-types
AssertiveScalarValidator<{}, InstanceType<T>> {
  constructor(public of: T) {
    super();
    super.expect(message);
  }

  override is(input: unknown): input is InstanceType<T> {
    return input instanceof this.of;
  }

  toString(): string {
    return `instance of ${this.of.name}`;
  }
}
