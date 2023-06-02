// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { InstanceValidator } from "./instanceof.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("InstanceValidator", () => {
  it("is should be return true if instance of array", () => {
    assert(new InstanceValidator(Array).is([]));
    assert(new InstanceValidator(Object).is({}));
    assertFalse(new InstanceValidator(Array).is({}));
  });

  it("should represent of", () => {
    assertEquals(new InstanceValidator(Array).toString(), `instance of Array`);
  });
});
