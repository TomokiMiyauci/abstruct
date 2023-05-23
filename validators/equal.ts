// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { shouldBeBut } from "./utils.ts";
import { ScalarValidator } from "../utils.ts";
import type { Assert, AssertiveValidator } from "../types.ts";

export class EqualityValidator<const In_ = unknown> extends ScalarValidator
  implements AssertiveValidator<unknown, In_> {
  declare [Assert.symbol]: In_;
  constructor(public value: In_) {
    super();
    super.expect(shouldBeBut);
  }

  is(input: unknown): boolean {
    return input === this.value;
  }

  override toString(): string {
    return `${this.value}`;
  }
}
