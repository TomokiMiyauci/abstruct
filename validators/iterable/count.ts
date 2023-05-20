// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { getSize } from "./utils.ts";
import { format, ScalarValidator } from "../../utils.ts";
import error from "../error.json" assert { type: "json" };
import plural from "../plural.json" assert { type: "json" };

export class CountValidator extends ScalarValidator<Iterable<unknown>> {
  constructor(public count: number) {
    super();
    super.expect(({ input }) =>
      format(error.should_be_but, this, getSize(input))
    );
  }

  override is(input: Iterable<unknown>): boolean {
    return getSize(input) === this.count;
  }

  toString(): string {
    const pr = new Intl.PluralRules("en-US");
    const suffix = plural[pr.select(this.count)];

    return `${this.count} item${suffix}`;
  }
}
