// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isInRange } from "./utils.ts";
import { ScalarValidator } from "../utils.ts";

export class RangeValidator<In> extends ScalarValidator<In> {
  #range!: [In, In];

  get range(): [In, In] {
    return this.#range;
  }

  set range(range) {
    if (range[1] <= range[0]) {
      throw RangeError("max should be greater than min");
    }

    this.#range = range;
  }

  /**
   * @throws {RangeError} If {@link max} less than or equal to {@link min}.
   */
  constructor(min: In, max: In) {
    super();

    this.range = [min, max];
  }

  override is(input: In): input is In {
    return isInRange(input, this.range);
  }

  override toString(): string {
    return `between ${this.range[0]} and ${this.range[1]}`;
  }
}
