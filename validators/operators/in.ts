// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.
// deno-lint-ignore-file ban-types

import { IsValidator } from "../utils.ts";
import { print } from "../../utils.ts";

/** Validator equivalent to `in` operator.
 *
 * @example
 * ```ts
 * import { InValidator } from "https://deno.land/x/abstruct@$VERSION/validators/operators/in.ts";
 * const validator = new InValidator("property");
 * ```
 */
export class InValidator<const K extends PropertyKey>
  extends IsValidator<{}, Record<K, unknown>> {
  constructor(public key: K) {
    super();
  }

  is(input: {}): input is Record<K, unknown> {
    return this.key in input;
  }

  override toString(): string {
    return `has ${print(this.key)}`;
  }
}
