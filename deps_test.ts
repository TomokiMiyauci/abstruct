// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { interpolate, isInRange } from "./deps.ts";
import {
  assert,
  assertEquals,
  assertThrows,
  describe,
  it,
} from "./_dev_deps.ts";

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
    assertThrows(() => isInRange(0, [0, -1]));
  });
});

describe("interpolate", () => {
  it("should return injected string with type safe", () => {
    assertEquals(interpolate("0{0}{1}1", ["ab", "cd"]), "0abcd1");
    assertEquals(
      interpolate("0{0}{1}{0}{1}1", ["ab", "cd", "ef"]),
      "0abcdabcd1",
    );
  });

  it("should not replace", () => {
    assertEquals(interpolate<string>("0{0}{1}1", {}), "0{0}{1}1");
  });

  it("should change delimiter", () => {
    assertEquals(
      interpolate("0{0}[1]1", { 1: Symbol() }, { prefix: "[", suffix: "]" }),
      "0{0}Symbol()1",
    );
  });
});
