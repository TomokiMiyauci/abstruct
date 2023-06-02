// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { EmptyValidator } from "./empty.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("EmptyValidator", () => {
  it("is should be return true if input item is empty", () => {
    assert(new EmptyValidator().is(""));
    assert(new EmptyValidator().is([]));
    assert(new EmptyValidator().is(new Set()));

    assertFalse(new EmptyValidator().is(" "));
  });

  it("should represent of", () => {
    assertEquals(new EmptyValidator().toString(), "empty");
  });
});
