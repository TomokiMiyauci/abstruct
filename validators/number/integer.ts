// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { ToPredicate } from "../../deps.ts";
import { shouldBeBut } from "../utils.ts";
import { ScalarValidator } from "../../utils.ts";

export class IntegerValidator extends ScalarValidator<number> {
  constructor() {
    super();
    super.expect(shouldBeBut);
  }

  is = Number.isInteger as ToPredicate<(input: number) => boolean>;

  override toString() {
    return "integer";
  }
}
