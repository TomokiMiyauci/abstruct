// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ScalarValidator } from "../../utils.ts";
import { count } from "../../iter_utils.ts";
import plural from "../plural.json" assert { type: "json" };

export class CountValidator extends ScalarValidator<Iterable<unknown>> {
  constructor(public count: number) {
    super();
  }

  override is(input: Iterable<unknown>): input is Iterable<unknown> {
    return count(input) === this.count;
  }

  override toString(): string {
    const pr = new Intl.PluralRules("en-US");
    const suffix = plural[pr.select(this.count)];

    return `${this.count} item${suffix}`;
  }
}
