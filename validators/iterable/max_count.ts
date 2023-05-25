// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { getCount } from "../../iter_utils.ts";
import { ScalarValidator } from "../../utils.ts";

export class MaxCountValidator extends ScalarValidator<Iterable<unknown>> {
  constructor(public size: number) {
    super();
  }

  override is(input: Iterable<unknown>): input is Iterable<unknown> {
    return getCount(input) <= this.size;
  }

  override toString(): string {
    return `max item count of ${this.size}`;
  }
}
