// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { isInRange, print } from "./utils.ts";
import {
  assert,
  assertEquals,
  assertThrows,
  describe,
  it,
} from "./_dev_deps.ts";

describe("print", () => {
  it("should display as", () => {
    const table: [unknown, string][] = [
      ["", `""`],
      ["abc", `"abc"`],
      [0, "0"],
      [0n, "0n"],
      [true, "true"],
      [false, "false"],
      [null, "null"],
      [undefined, "undefined"],
      [Symbol("a"), "Symbol(a)"],
      [{}, "[object Object]"],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(print(input), expected);
    });
  });
});

describe("isInRange", () => {
  it("should return true if number", () => {
    assert(isInRange(10, [1, 10]));
  });

  it("should return true if date", () => {
    assert(
      isInRange(new Date("2000/1/1"), [
        new Date("1999/1/1"),
        new Date("2001/1/1"),
      ]),
    );
  });

  it("should throw error if range is invalid", () => {
    assertThrows(() => isInRange(0, [0, 0]));
  });
});
