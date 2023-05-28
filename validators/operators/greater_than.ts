// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { inspect, ScalarValidator } from "../../utils.ts";

export class GreaterThanValidator<In> extends ScalarValidator<In> {
  constructor(public base: In) {
    super();
  }

  override is(input: In): input is In {
    return this.base < input;
  }

  override toString(): string {
    return `greater than ${inspect(this.base)}`;
  }
}
