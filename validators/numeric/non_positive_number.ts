// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ScalarValidator } from "../../utils.ts";
import { isNonPositiveNumber, ToPredicate } from "../../deps.ts";

export class NonPositiveNumberValidator
  extends ScalarValidator<number | bigint> {
  is = isNonPositiveNumber as ToPredicate<typeof isNonPositiveNumber>;

  override toString() {
    return "non-positive number";
  }
}
