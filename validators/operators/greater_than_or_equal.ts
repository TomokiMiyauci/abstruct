// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ScalarValidator } from "../../utils.ts";

export class GreaterThanOrEqualValidator<In> extends ScalarValidator<In> {
  constructor(public base: In) {
    super();
  }

  override is(input: In): input is In {
    return input >= this.base;
  }

  override toString(): string {
    return `>= ${this.base}`;
  }
}
