// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { shouldBe } from "../utils.ts";
import { isNotEmpty } from "../../deps.ts";
import { display, ScalarValidator } from "../../utils.ts";

@display("non empty")
export class NonEmptyValidator extends ScalarValidator<Iterable<unknown>> {
  constructor() {
    super();
    super.expect(shouldBe);
  }
  override is = isNotEmpty;
}
