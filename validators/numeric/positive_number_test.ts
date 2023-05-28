// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { PositiveNumberValidator } from "./positive_number.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("PositiveNumberValidator", () => {
  it("is should be return true if input is positive number", () => {
    const validator = new PositiveNumberValidator();
    assert(validator.is(1));
    assert(validator.is(1.1));

    assertFalse(validator.is(-1));
    assertFalse(validator.is(0));
  });

  it("should represent of", () => {
    assertEquals(new PositiveNumberValidator().toString(), "positive number");
  });
});
