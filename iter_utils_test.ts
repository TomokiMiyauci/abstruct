// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import {
  count,
  enumerate,
  isPositiveInteger,
  iter,
  map,
  take,
} from "./iter_utils.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  assertSpyCalls,
  assertThrows,
  describe,
  it,
  spy,
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

describe("map", () => {
  it("should return mapped iterable", () => {
    assertEquals([...map([1, 2, 3], (number) => number ** number)], [1, 4, 27]);
  });

  it("should not call map until yield", () => {
    const mapper = spy(() => 1);
    const iterable = map([1, 2, 3], mapper);

    assertSpyCalls(mapper, 0);

    [...iterable];

    assertSpyCalls(mapper, 3);
  });
});

describe("iter", () => {
  it("should return iterator", () => {
    function* gen() {
      yield 1;
    }
    const iterable = gen();
    assertEquals(iter(iterable), iterable[Symbol.iterator]());
  });
});

describe("count", () => {
  it("should return number of yielded", () => {
    assertEquals(count([1, 2, 3]), 3);

    function* gen() {
      yield 1;
      yield 2;
      yield 3;
    }

    assertEquals(count(gen()), 3);
  });
});

describe("enumerate", () => {
  it("should return entries", () => {
    assertEquals([...enumerate([1, 2, 3])], [[0, 1], [1, 2], [2, 3]]);
    assertEquals([...enumerate([1, 2, 3], 4)], [[4, 1], [5, 2], [6, 3]]);
  });
});
