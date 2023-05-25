// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isSingle } from "../../deps.ts";
import { ScalarValidator } from "../../utils.ts";

export class SingleValidator extends ScalarValidator<Iterable<unknown>> {
  override is = isSingle;

  override toString() {
    return "single";
  }
}
