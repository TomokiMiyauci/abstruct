// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isNonNullable } from "../deps.ts";
import { AssertiveScalarValidator, display } from "../utils.ts";

@display("nullish")
export class NullishValidator
  extends AssertiveScalarValidator<unknown, undefined | null> {
  override is(input: unknown): input is null | undefined {
    return isNonNullable(input);
  }
}
