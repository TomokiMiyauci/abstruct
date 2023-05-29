// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { NonEmptyValidator } from "./non_empty.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("NonEmptyValidator", () => {
  it("is should be return true if input item is empty", () => {
    assert(new NonEmptyValidator().is("a"));
    assert(new NonEmptyValidator().is([1, 2]));

    assertFalse(new NonEmptyValidator().is(""));
    assertFalse(new NonEmptyValidator().is([]));
  });

  it("should represent of", () => {
    assertEquals(new NonEmptyValidator().toString(), "non-empty");
  });
});
