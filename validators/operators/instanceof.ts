// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { IsValidator } from "../utils.ts";
import { type Constructor } from "../../deps.ts";

/** Validator for instance. It executes `instanceof` operator.
 *
 * @example
 * ```ts
 * import { InstanceValidator } from "https://deno.land/x/abstruct@$VERSION/validators/operators/instanceof.ts";
 * const validator = new InstanceValidator(Array);
 * ```
 */
export class InstanceValidator<T extends Constructor>
  extends IsValidator<unknown, InstanceType<T>> {
  constructor(public of: T) {
    super();
  }

  override is(input: unknown): input is InstanceType<T> {
    return input instanceof this.of;
  }

  override toString(): string {
    return `instance of ${this.of.name}`;
  }
}
