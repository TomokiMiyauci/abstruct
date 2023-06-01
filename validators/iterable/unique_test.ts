// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { duplicates, UniqueValidator } from "./unique.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("UniqueValidator", () => {
  it("is should be return true if each item is unique", () => {
    assert(new UniqueValidator().is("abcd"));
    assert(new UniqueValidator().is([1, 2, 3, 4]));

    assertFalse(new UniqueValidator().is("aaa"));
  });

  it("validate should yield multiple failures", () => {
    assertEquals([...new UniqueValidator().validate("aaa")], [
      { instancePath: [1], message: "", index: 1, item: "a" },
      { instancePath: [2], message: "", index: 2, item: "a" },
    ]);
  });

  it("should represent of", () => {
    assertEquals(new UniqueValidator().toString(), "unique");
  });
});

describe("duplicates", () => {
  it("should yield duplicated items", () => {
    assertEquals([...duplicates([1, 1, 2, 2, 1, 2])], [
      [1, 1],
      [3, 2],
      [4, 1],
      [5, 2],
    ]);
  });
});
