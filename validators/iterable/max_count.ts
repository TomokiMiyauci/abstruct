// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { getCount } from "../../iter_utils.ts";
import { interpolate, ScalarValidator } from "../../utils.ts";
import error from "../error.json" assert { type: "json" };

export class MaxCountValidator extends ScalarValidator<Iterable<unknown>> {
  constructor(public size: number) {
    super();
    super.expect(({ input }) =>
      interpolate(error.max_count, [size, getCount(input)])
    );
  }

  override is(input: Iterable<unknown>): boolean {
    return getCount(input) <= this.size;
  }

  toString(): string {
    return `max item count of ${this.size}`;
  }
}
