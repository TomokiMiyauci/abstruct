// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isValidDate, type ToPredicate } from "../../deps.ts";
import { shouldBe } from "../utils.ts";
import { ScalarValidator } from "../../utils.ts";

export class ValidDateValidator extends ScalarValidator<Date> {
  constructor() {
    super();
    super.expect(shouldBe);
  }

  override is = isValidDate as ToPredicate<typeof isValidDate>;

  override toString() {
    return "valid Date";
  }
}
