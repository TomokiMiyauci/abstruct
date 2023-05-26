// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ScalarValidator } from "../utils.ts";

export class EnumValidator<const T> extends ScalarValidator<unknown, T> {
  values: [T, T, ...T[]];
  constructor(v1: T, v2: T, ...values: readonly T[]) {
    super();
    this.values = [v1, v2, ...values];
  }

  is(input: unknown): input is T {
    return (this.values as unknown[]).includes(input);
  }

  override toString(): string {
    const intl = new Intl.ListFormat("en", { type: "disjunction" });

    return intl.format(this.values.map(String));
  }
}
