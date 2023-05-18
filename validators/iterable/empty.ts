// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isEmpty } from "../../deps.ts";
import { display, format, ScalarValidator } from "../../utils.ts";
import error from "../error.json" assert { type: "json" };

@display("empty")
export class EmptyValidator extends ScalarValidator<Iterable<unknown>> {
  constructor() {
    super();
    super.expect(() => format(error.should_be, this));
  }
  override is = isEmpty;
}
