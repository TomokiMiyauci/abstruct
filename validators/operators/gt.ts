// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ScalarValidator } from "../../utils.ts";
import { shouldBeBut } from "../utils.ts";

export class GreaterThenValidator<In> extends ScalarValidator<In> {
  constructor(public base: In) {
    super();
    super.expect(shouldBeBut);
  }

  override is(input: In): input is In {
    return this.base < input;
  }

  override toString(): string {
    return `greater then ${this.base}`;
  }
}