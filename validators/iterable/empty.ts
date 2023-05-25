// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isEmpty } from "../../deps.ts";
import { ScalarValidator } from "../../utils.ts";

export class EmptyValidator extends ScalarValidator<Iterable<unknown>> {
  constructor() {
    super();
  }
  override is = isEmpty;

  override toString() {
    return "empty";
  }
}
