// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { PatternValidator } from "./pattern.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("PatternValidator", () => {
  it("is should be return true if pattern matched", () => {
    assert(new PatternValidator(/a/).is("abc"));

    assertFalse(new PatternValidator(/a/).is("def"));
  });

  it("should represent of", () => {
    assertEquals(
      new PatternValidator(/abc/).toString(),
      `pattern of \`/abc/\``,
    );
  });
});
