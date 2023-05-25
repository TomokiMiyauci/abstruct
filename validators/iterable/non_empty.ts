// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isNotEmpty } from "../../deps.ts";
import { ScalarValidator } from "../../utils.ts";

export class NonEmptyValidator extends ScalarValidator<Iterable<unknown>> {
  override is = isNotEmpty;

  override toString() {
    return "non empty";
  }
}
