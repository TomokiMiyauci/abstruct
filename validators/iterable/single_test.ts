// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { SingleValidator } from "./single.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("SingleValidator", () => {
  it("is should be return true if items is single", () => {
    assert(new SingleValidator().is("a"));
    assert(new SingleValidator().is([1]));

    assertFalse(new SingleValidator().is(""));
  });

  it("should represent of", () => {
    assertEquals(new SingleValidator().toString(), "single");
  });
});
