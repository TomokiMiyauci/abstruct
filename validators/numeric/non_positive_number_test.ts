// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { NonPositiveNumberValidator } from "./non_positive_number.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("NonPositiveNumberValidator", () => {
  it("is should be return true if input is non-positive number", () => {
    const validator = new NonPositiveNumberValidator();
    assert(validator.is(-1));
    assert(validator.is(-1n));
    assert(validator.is(0));

    assertFalse(validator.is(1));
  });

  it("should represent of", () => {
    assertEquals(
      new NonPositiveNumberValidator().toString(),
      "non-positive number",
    );
  });
});
