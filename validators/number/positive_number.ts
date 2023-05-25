// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { shouldBeBut } from "../utils.ts";
import { ScalarValidator } from "../../utils.ts";
import { isPositiveNumber, ToPredicate } from "../../deps.ts";

export class PositiveNumberValidator extends ScalarValidator<number> {
  constructor() {
    super();
    super.expect(shouldBeBut);
  }

  is = isPositiveNumber as ToPredicate<typeof isPositiveNumber>;

  override toString() {
    return "positive number";
  }
}
