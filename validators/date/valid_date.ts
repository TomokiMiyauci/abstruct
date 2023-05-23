// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isValidDate } from "../../deps.ts";
import { shouldBe } from "../utils.ts";
import { display, ScalarValidator } from "../../utils.ts";

@display("valid Date")
export class ValidDateValidator extends ScalarValidator<Date> {
  constructor() {
    super();
    super.expect(shouldBe);
  }

  override is = isValidDate;
}
