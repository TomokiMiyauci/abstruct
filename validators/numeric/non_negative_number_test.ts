// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { NonNegativeNumberValidator } from "./non_negative_number.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("NonNegativeNumberValidator", () => {
  it("is should be return true if input is non-negative number", () => {
    const validator = new NonNegativeNumberValidator();
    assert(validator.is(0));
    assert(validator.is(1n));

    assertFalse(validator.is(-1));
  });

  it("should represent of", () => {
    assertEquals(
      new NonNegativeNumberValidator().toString(),
      "non-negative number",
    );
  });
});
