// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { RangeValidator } from "./range.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  assertThrows,
  describe,
  it,
} from "../_dev_deps.ts";

describe("RangeValidator", () => {
  it("is should be return true if pattern matched", () => {
    assert(new RangeValidator(1, 10).is(3));
    assert(new RangeValidator(1n, 10n).is(2n));

    assertFalse(new RangeValidator(1n, 10n).is(11n));
  });

  it("should represent of", () => {
    assertEquals(new RangeValidator(1, 2).toString(), "between 1 and 2");
  });

  it("should be throw if range is invalid", () => {
    assertThrows(() => new RangeValidator(1, -1));
    assertThrows(() => {
      const validator = new RangeValidator(1, 2);

      validator.range = [1, 0];
    });
  });
});
