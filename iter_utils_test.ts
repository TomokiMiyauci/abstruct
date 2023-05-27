// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { isPositiveInteger, take } from "./iter_utils.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  assertThrows,
  describe,
  it,
} from "./_dev_deps.ts";

describe("isPositiveInteger", () => {
  it("should return true", () => {
    const table: number[] = [
      1,
      Number.MAX_SAFE_INTEGER,
    ];

    table.forEach((input) => {
      assert(isPositiveInteger(input));
    });
  });

  it("should return false", () => {
    const table: number[] = [
      NaN,
      0,
      -0,
      Infinity,
      -Infinity,
      -1,
      1.1,
      Number.MIN_SAFE_INTEGER,
    ];

    table.forEach((input) => {
      assertFalse(isPositiveInteger(input));
    });
  });
});

describe("take", () => {
  it("should yield all value by default", () => {
    function* gen() {
      yield* [1, 2, 3];
    }
    assertEquals([...take(gen())], [1, 2, 3]);
  });

  it("should take max number of limit", () => {
    function* gen() {
      yield* [1, 2, 3];
    }
    assertEquals([...take(gen(), 1)], [1]);
    assertEquals([...take(gen(), 2)], [1, 2]);
    assertEquals([...take(gen(), 10)], [1, 2, 3]);
  });

  it("should throw error if the limit is not positive number", () => {
    assertThrows(() => [...take([], -1)]);
    assertThrows(() => [...take([], 0)]);
    assertThrows(() => [...take([], 1.1)]);
    assertThrows(() => [...take([], NaN)]);
  });
});
