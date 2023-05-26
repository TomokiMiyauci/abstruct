// deno-lint-ignore-file ban-types
// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ScalarValidator } from "../utils.ts";

export class PrototypeValidator extends ScalarValidator<{}> {
  constructor(public proto: {}) {
    super();
  }

  is(input: {}): input is {} {
    const is = Object.getPrototypeOf(input) === this.proto;

    return is;
  }

  override toString(): string {
    return `prototype of ${Object.getPrototypeOf(this.proto)}`;
  }
}
