// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { shouldBeBut } from "./utils.ts";
import { ScalarValidator } from "../utils.ts";
import type { Assert } from "../types.ts";

export class ValueValidator<Out = unknown> extends ScalarValidator
  implements Assert<unknown, Out> {
  declare [Assert.symbol]: Out;
  constructor(public value: Out) {
    super();
    super.expect(shouldBeBut);
  }

  is(input: unknown): boolean {
    return input === this.value;
  }

  toString(): string {
    return `${this.value}`;
  }
}
