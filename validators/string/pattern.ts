// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { IsValidator } from "../utils.ts";

/** Validator for regex pattern.
 *
 * @example
 * ```ts
 * import { PatternValidator } from "https://deno.land/x/abstruct@$VERSION/validators/string/pattern.ts";
 * const validator = new PatternValidator(/^\d+$/);
 * ```
 */
export class PatternValidator extends IsValidator<string> {
  constructor(public pattern: RegExp) {
    super();
  }

  is(input: string): input is string {
    return this.pattern.test(input);
  }

  override toString(): string {
    return `pattern of \`${this.pattern}\``;
  }
}
