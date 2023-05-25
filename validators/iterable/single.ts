// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { shouldBe } from "../utils.ts";
import { isSingle } from "../../deps.ts";
import { ScalarValidator } from "../../utils.ts";

export class SingleValidator extends ScalarValidator<Iterable<unknown>> {
  constructor() {
    super();
    super.expect(shouldBe);
  }
  override is = isSingle;

  override toString() {
    return "single";
  }
}
