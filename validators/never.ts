// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { display, interpolate, ScalarValidator } from "../utils.ts";
import error from "./error.json" assert { type: "json" };

@display("never")
export class NeverValidator extends ScalarValidator<unknown, never> {
  constructor() {
    super();
    super.expect(() => interpolate(error.should_be, this));
  }

  is(_: unknown): _ is never {
    return false;
  }
}
