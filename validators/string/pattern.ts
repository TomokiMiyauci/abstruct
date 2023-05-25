// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ScalarValidator } from "../../utils.ts";

export class PatternValidator extends ScalarValidator<string> {
  constructor(public readonly pattern: RegExp) {
    super();
  }

  is(input: string): input is string {
    return this.pattern.test(input);
  }

  override toString(): string {
    return `pattern of \`${this.pattern}\``;
  }
}
