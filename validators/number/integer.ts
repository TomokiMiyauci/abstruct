// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { shouldBeBut } from "../utils.ts";
import { display, ScalarValidator } from "../../utils.ts";

@display("integer")
export class IntegerValidator extends ScalarValidator<number> {
  constructor() {
    super();
    super.expect(shouldBeBut);
  }

  is = Number.isInteger;
}
