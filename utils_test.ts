// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { print } from "./utils.ts";
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
