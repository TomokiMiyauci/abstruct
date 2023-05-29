// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { entriesAll, isInRange, print, printProps } from "./utils.ts";
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

describe("printProps", () => {
  it("should display as", () => {
    // deno-lint-ignore ban-types
    const table: [{}, string][] = [
      ["", `{}`],
      [0, `{}`],
      [{ a: "" }, `{a: ""}`],
      [{ a: "", b: " ", c: "  " }, `{a: "", b: " ", c: "  "}`],
      [{ c: "  ", a: "", b: " " }, `{c: "  ", a: "", b: " "}`],
      [
        { [Symbol.iterator]: "", a: 0n },
        `{a: 0n, Symbol(Symbol.iterator): ""}`,
      ],
      [
        { [Symbol.iterator]: "", a: 0n, [Symbol.hasInstance]: "a" },
        `{a: 0n, Symbol(Symbol.iterator): "", Symbol(Symbol.hasInstance): "a"}`,
      ],
    ];

    table.forEach(([input, expected]) => {
      assertEquals(printProps(input), expected);
    });
  });
});

describe("entriesAll", () => {
  it("should return entries includes symbol entry", () => {
    const table: [
      Record<PropertyKey, unknown>,
      [string | symbol, unknown][],
    ][] = [
      [{}, []],
      [{ a: "" }, [["a", ""]]],
      [{ a: "", b: "" }, [["a", ""], ["b", ""]]],
      [{ b: "", a: "" }, [["b", ""], ["a", ""]]],
      [{ [Symbol.asyncIterator]: "", a: "", [Symbol.iterator]: "" }, [
        ["a", ""],
        [Symbol.asyncIterator, ""],
        [Symbol.iterator, ""],
      ]],
    ];

    table.forEach(([obj, expected]) => {
      assertEquals(entriesAll(obj), expected);
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
