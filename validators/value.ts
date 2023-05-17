// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { format, ScalarValidator } from "../utils.ts";
import type { Assert } from "../types.ts";
import error from "./error.json" assert { type: "json" };

export class ValueValidator<Out = unknown> extends ScalarValidator
  implements Assert<unknown, Out> {
  declare [Assert.symbol]: Out;
  constructor(public value: Out) {
    super();
    super.expect(({ input }) => format(error.should_be_but, this, input));
  }

  is(input: unknown): boolean {
    return input === this.value;
  }

  toString(): string {
    return `${this.value}`;
  }
}
