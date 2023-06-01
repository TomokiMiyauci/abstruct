// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import {
  createInst,
  entriesAll,
  Expectable,
  fromMessage,
  fromPath,
  print,
  printProps,
} from "./utils.ts";
import { assertEquals, describe, it } from "./_dev_deps.ts";
import { ValidationFailure } from "./mod.ts";

describe("fromMessage", () => {
  it("should return new message failure", () => {
    const failure = new ValidationFailure();
    assertEquals(fromMessage(failure, "test"), new ValidationFailure("test"));
  });

  it("should return old message", () => {
    const failure = new ValidationFailure("test");
    assertEquals(fromMessage(failure, ""), new ValidationFailure("test"));
  });
});

describe("fromPath", () => {
  it("should return new instance path", () => {
    const failure = new ValidationFailure("", { instancePath: [1, 2, 3] });
    assertEquals(
      fromPath(failure, 0),
      new ValidationFailure("", { instancePath: [0, 1, 2, 3] }),
    );
  });
});

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

describe("Expectable", () => {
  it("should override failure message", () => {
    class V {
      validate() {
        return [{ message: "", instancePath: [] }];
      }
    }
    const $V = Expectable(V);

    assertEquals([...new $V().expect(`test`).validate("")], [
      new ValidationFailure("test", { instancePath: [] }),
    ]);
    assertEquals([...new $V().expect(`test`).expect(`test2`).validate("")], [
      new ValidationFailure("test2", { instancePath: [] }),
    ]);

    assertEquals([
      ...new $V().expect(`test`).expect(`test2`).expect(() => "test3")
        .validate(""),
    ], [new ValidationFailure("test3", { instancePath: [] })]);
  });

  it("should return default message if not set", () => {
    class V {
      validate() {
        return [{ message: "test", instancePath: [] }];
      }
    }
    const $V = Expectable(V);

    assertEquals([...new $V().validate("")], [
      new ValidationFailure("test", { instancePath: [] }),
    ]);
  });
});
