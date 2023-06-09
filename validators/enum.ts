// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { IsValidator } from "./utils.ts";

/** Enumerator validator.
 *
 * @example
 * ```ts
 * import { EnumValidator } from "https://deno.land/x/abstruct@$VERSION/validators/enum.ts";
 * const validator = new EnumValidator(1, 2, 3);
 * ```
 */
export class EnumValidator<const RIn> extends IsValidator<unknown, RIn> {
  values: [RIn, RIn, ...RIn[]];
  constructor(v1: RIn, v2: RIn, ...values: readonly RIn[]) {
    super();
    this.values = [v1, v2, ...values];
  }

  is(input: unknown): input is RIn {
    return (this.values as unknown[]).includes(input);
  }

  override toString(): string {
    const intl = new Intl.ListFormat("en", { type: "disjunction" });

    return intl.format(this.values.map(String));
  }
}
