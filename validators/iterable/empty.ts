// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { shouldBe } from "../utils.ts";
import { isEmpty } from "../../deps.ts";
import { ScalarValidator } from "../../utils.ts";

export class EmptyValidator extends ScalarValidator<Iterable<unknown>> {
  constructor() {
    super();
    super.expect(shouldBe);
  }
  override is = isEmpty;

  override toString() {
    return "empty";
  }
}
