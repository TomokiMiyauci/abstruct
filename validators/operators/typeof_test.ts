// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { typeOf, TypeValidator } from "./typeof.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("typeOf", () => {
  it("should return type", () => {
    const table: [unknown, string][] = [
      ["", "string"],
      [0, "number"],
      [0n, "bigint"],
      [false, "boolean"],
      [Symbol(), "symbol"],
      [undefined, "undefined"],
      [null, "null"],
      [{}, "object"],
      [() => {}, "function"],
    ];

    table.forEach(([input, type]) => {
      assertEquals(typeOf(input), type);
    });
  });
});

describe("TypeValidator", () => {
  it("should return true if the input is typeof", () => {
    const v = new TypeValidator("string");

    assert(v.is(""));
  });
  it("should return false if the input is not typeof", () => {
    const v = new TypeValidator("number");

    assertFalse(v.is(""));
  });

  it("should display of", () => {
    const v = new TypeValidator("string");

    assertEquals(`${v}`, "string");
  });
});
