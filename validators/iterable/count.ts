// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { getSize } from "./utils.ts";
import { format, ScalarValidator } from "../../utils.ts";
import error from "../error.json" assert { type: "json" };

export class CountValidator extends ScalarValidator<Iterable<unknown>> {
  constructor(public size: number) {
    super();
    super.expect(({ input }) =>
      format(error.should_be_but, this, getSize(input))
    );
  }

  override is(input: Iterable<unknown>): boolean {
    return getSize(input) === this.size;
  }

  toString(): string {
    return `number of ${this.size}`;
  }
}
