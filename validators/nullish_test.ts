// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { NullishValidator } from "./nullish.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../_dev_deps.ts";

describe("NullishValidator", () => {
  it("is should be return true if pattern matched", () => {
    assert(new NullishValidator().is(null));
    assert(new NullishValidator().is(undefined));

    assertFalse(new NullishValidator().is(""));
  });

  it("should represent of", () => {
    assertEquals(new NullishValidator().toString(), "nullish");
  });
});
