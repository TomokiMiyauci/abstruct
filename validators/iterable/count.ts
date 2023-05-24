// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { interpolate, ScalarValidator } from "../../utils.ts";
import { getCount } from "../../iter_utils.ts";
import error from "../error.json" assert { type: "json" };
import plural from "../plural.json" assert { type: "json" };

export class CountValidator extends ScalarValidator<Iterable<unknown>> {
  constructor(public count: number) {
    super();
    super.expect(({ input }) =>
      interpolate(error.should_be_but, [this, getCount(input)])
    );
  }

  override is(input: Iterable<unknown>): input is Iterable<unknown> {
    return getCount(input) === this.count;
  }

  override toString(): string {
    const pr = new Intl.PluralRules("en-US");
    const suffix = plural[pr.select(this.count)];

    return `${this.count} item${suffix}`;
  }
}
