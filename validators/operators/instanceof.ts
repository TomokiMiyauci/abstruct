// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { type Constructor } from "../../deps.ts";
import { ScalarValidator } from "../../utils.ts";

export class InstanceValidator<T extends Constructor> extends // deno-lint-ignore ban-types
ScalarValidator<{}, InstanceType<T>> {
  constructor(public of: T) {
    super();
  }

  override is(input: unknown): input is InstanceType<T> {
    return input instanceof this.of;
  }

  override toString(): string {
    return `instance of ${this.of.name}`;
  }
}
