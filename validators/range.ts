// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isInRange } from "../deps.ts";
import { print, ScalarValidator } from "../utils.ts";

/** Range validator.
 *
 * @example
 * ```ts
 * import { RangeValidator } from "https://deno.land/x/abstruct@$VERSION/validators/range.ts";
 * const validator = new RangeValidator(4, 8);
 * ```
 */
export class RangeValidator<In> extends ScalarValidator<In> {
  #range!: readonly [In, In];

  /**
   * @throws {RangeError} If {@link max} less than {@link min}.
   */
  constructor(min: In, max: In) {
    super();

    this.range = [min, max];
  }

  get range(): readonly [In, In] {
    return this.#range;
  }

  set range(range) {
    if (range[1] < range[0]) {
      throw RangeError("max should be greater than or equal to min");
    }

    this.#range = range;
  }

  override is(input: In): input is In {
    return isInRange(input, this.range);
  }

  override toString(): string {
    return `between ${print(this.range[0])} and ${print(this.range[1])}`;
  }
}
