// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ScalarValidator } from "../../utils.ts";

export class EqualityValidator<const A = unknown>
  extends ScalarValidator<unknown, A> {
  constructor(public value: A) {
    super();
  }

  override is(input: unknown): input is A {
    return input === this.value;
  }

  override toString(): string {
    return `${this.value}`;
  }
}
