// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { display, ScalarValidator } from "../utils.ts";

@display("unknown")
export class UnknownValidator extends ScalarValidator {
  is(): boolean {
    return true;
  }
}
