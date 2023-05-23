// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import error from "../error.json" assert { type: "json" };
import { format, ScalarValidator } from "../../utils.ts";

export class PatternValidator extends ScalarValidator<string> {
  constructor(public readonly pattern: RegExp) {
    super();
    super.expect(({ input }) =>
      format(error.should_be_but, `match ${this}`, `"${input}"`)
    );
  }

  is(input: string): boolean {
    return this.pattern.test(input);
  }

  override toString(): string {
    return `pattern of \`${this.pattern}\``;
  }
}
