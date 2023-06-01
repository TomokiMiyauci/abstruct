// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import {
  createInst,
  entriesAll,
  print,
  printProps,
  Reportable,
} from "./utils.ts";
import { assertEquals, describe, it } from "./_dev_deps.ts";

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
    const table: [Record<PropertyKey, unknown>, string][] = [
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

describe("createInst", () => {
  it("should pass args to constructor", () => {
    class A {
      constructor(...args: unknown[]) {
        assertEquals(args, []);
      }
    }

    createInst(A)();
  });
});

describe("Reportable", () => {
  it("should override failure message", () => {
    class V {
      validate() {
        return [{ message: "", instancePath: [] }];
      }
    }
    const $V = Reportable(V);

    assertEquals([...new $V().expect(`test`).validate("")], [{
      message: "test",
      instancePath: [],
    }]);
    assertEquals([...new $V().expect(`test`).expect(`test2`).validate("")], [{
      message: "test2",
      instancePath: [],
    }]);

    assertEquals([
      ...new $V().expect(`test`).expect(`test2`).expect(() => "test3")
        .validate(""),
    ], [{
      message: "test3",
      instancePath: [],
    }]);
  });
});
