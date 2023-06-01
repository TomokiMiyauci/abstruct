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
export class EnumValidator<const A> extends IsValidator<unknown, A> {
  values: [A, A, ...A[]];
  constructor(v1: A, v2: A, ...values: readonly A[]) {
    super();
    this.values = [v1, v2, ...values];
  }

  is(input: unknown): input is A {
    return (this.values as unknown[]).includes(input);
  }

  override toString(): string {
    const intl = new Intl.ListFormat("en", { type: "disjunction" });

    return intl.format(this.values.map(String));
  }
}
