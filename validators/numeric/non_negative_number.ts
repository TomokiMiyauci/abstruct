// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ScalarValidator } from "../../utils.ts";
import { isNonNegativeNumber, ToPredicate } from "../../deps.ts";

export class NonNegativeNumberValidator extends ScalarValidator<number> {
  is = isNonNegativeNumber as ToPredicate<typeof isNonNegativeNumber>;

  override toString() {
    return "non-negative number";
  }
}
