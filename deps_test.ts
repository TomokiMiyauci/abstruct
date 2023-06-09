// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { isInRange } from "./deps.ts";
import { assert, assertThrows, describe, it } from "./_dev_deps.ts";

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
