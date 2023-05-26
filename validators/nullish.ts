// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isNullable } from "../deps.ts";
import { ScalarValidator } from "../utils.ts";

export class NullishValidator
  extends ScalarValidator<unknown, undefined | null> {
  override is = isNullable;

  override toString() {
    return "nullish";
  }
}
