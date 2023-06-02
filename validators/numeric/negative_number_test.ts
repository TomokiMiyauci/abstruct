// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { NegativeNumberValidator } from "./negative_number.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("NegativeNumberValidator", () => {
  it("is should be return true if input is negative number", () => {
    const validator = new NegativeNumberValidator();
    assert(validator.is(-1));
    assert(validator.is(-1n));
    assert(validator.is(-1.1));

    assertFalse(validator.is(1));
    assertFalse(validator.is(0));
  });

  it("should represent of", () => {
    assertEquals(new NegativeNumberValidator().toString(), "negative number");
  });
});
