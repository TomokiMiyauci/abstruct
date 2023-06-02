// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { InequalityValidator } from "./inequality.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("InequalityValidator", () => {
  it("is should be return true if input strict equal to", () => {
    assert(new InequalityValidator(0).is(1));
    assertFalse(new InequalityValidator("a").is("a"));
  });

  it("should represent of", () => {
    assertEquals(new InequalityValidator(0).toString(), `not 0`);
    assertEquals(new InequalityValidator({}).toString(), `not [object Object]`);
  });
});
