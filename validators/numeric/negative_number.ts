// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ScalarValidator } from "../../utils.ts";
import { isNegativeNumber, ToPredicate } from "../../deps.ts";

export class NegativeNumberValidator extends ScalarValidator<number | bigint> {
  is = isNegativeNumber as ToPredicate<typeof isNegativeNumber>;

  override toString() {
    return "negative number";
  }
}
