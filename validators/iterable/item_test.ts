// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { ItemValidator } from "./item.ts";
import { TypeValidator } from "../operators/typeof.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("ItemValidator", () => {
  it("is should be return true if input each item is matched", () => {
    assert(new ItemValidator(new TypeValidator("string")).is("abc"));
    assert(new ItemValidator(new TypeValidator("string")).is(["a", "b", "c"]));

    assertFalse(new TypeValidator("number").is("abc"));
  });

  it("should represent of", () => {
    assertEquals(
      new ItemValidator(new TypeValidator("string")).toString(),
      "items(string)",
    );
  });
});
