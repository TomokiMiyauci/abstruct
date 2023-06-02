// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { FloatValidator, isFloat } from "./float.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("isFloat", () => {
  it("should return true", () => {
    const table: number[] = [
      1.1,
      -1.1,
    ];

    table.forEach((input) => {
      assert(isFloat(input));
    });
  });
  it("should return false", () => {
    const table: number[] = [
      1.0,
      0,
      -0,
      -1,
      NaN,
      Number.MAX_SAFE_INTEGER,
      Number.MIN_SAFE_INTEGER,
      Infinity,
      -Infinity,
    ];

    table.forEach((input) => {
      assertFalse(isFloat(input));
    });
  });
});

describe("FloatValidator", () => {
  it("should has is function", () => {
    assert(new FloatValidator().is === isFloat);
  });

  it("should display", () => {
    assertEquals(new FloatValidator().toString(), "float");
  });
});
