// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { shouldBeBut } from "../utils.ts";
import { display, ScalarValidator } from "../../utils.ts";
import { isPositiveNumber } from "../../deps.ts";

@display("positive number")
export class PositiveNumberValidator extends ScalarValidator<number> {
  constructor() {
    super();
    super.expect(shouldBeBut);
  }

  is = isPositiveNumber;
}
