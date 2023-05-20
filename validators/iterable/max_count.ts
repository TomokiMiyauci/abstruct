// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { getSize } from "./utils.ts";
import { interpolate, ScalarValidator } from "../../utils.ts";
import error from "../error.json" assert { type: "json" };

export class MaxCountValidator extends ScalarValidator<Iterable<unknown>> {
  constructor(public size: number) {
    super();
    super.expect(({ input }) =>
      interpolate(error.max_count, [size, getSize(input)])
    );
  }

  override is(input: Iterable<unknown>): boolean {
    return getSize(input) <= this.size;
  }

  toString(): string {
    return `max item count of ${this.size}`;
  }
}
