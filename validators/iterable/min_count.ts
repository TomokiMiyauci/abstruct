// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { getCount } from "../../iter_utils.ts";
import { interpolate, ScalarValidator } from "../../utils.ts";
import error from "../error.json" assert { type: "json" };

export class MinCountValidator extends ScalarValidator<Iterable<unknown>> {
  constructor(public size: number) {
    super();
    super.expect(({ input }) =>
      interpolate(error.min_count, [size, getCount(input)])
    );
  }

  override is(input: Iterable<unknown>): input is Iterable<unknown> {
    return this.size <= getCount(input);
  }

  override toString(): string {
    return `min item count of ${this.size}`;
  }
}
