// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { display, format, ScalarValidator } from "../../utils.ts";
import error from "../error.json" assert { type: "json" };

@display("integer")
export class IntegerValidator extends ScalarValidator<number> {
  constructor() {
    super();
    super.expect(({ input }) => format(error.should_be_but, this, input));
  }

  is = Number.isInteger;
}
