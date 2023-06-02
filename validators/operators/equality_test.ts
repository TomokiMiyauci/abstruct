// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { EqualityValidator } from "./equality.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("EqualityValidator", () => {
  it("is should be return true if input strict equal to", () => {
    assert(new EqualityValidator(0).is(0));
    const obj = {};
    assert(new EqualityValidator(obj).is(obj));

    assertFalse(new EqualityValidator(1).is(0));
    assertFalse(new EqualityValidator({}).is({}));
  });

  it("should represent of", () => {
    assertEquals(new EqualityValidator(0).toString(), `0`);
    assertEquals(new EqualityValidator({}).toString(), `[object Object]`);
  });
});
