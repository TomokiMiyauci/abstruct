// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { InValidator } from "./in.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("InValidator", () => {
  it("is should be return true if input has key", () => {
    assert(new InValidator(0).is({ 0: "" }));
    assert(new InValidator("").is({ "": "" }));
    const s = Symbol();
    assert(new InValidator(s).is({ [s]: "" }));

    assertFalse(new InValidator("").is({}));
  });

  it("should represent of", () => {
    assertEquals(new InValidator(0).toString(), `has 0`);
  });
});
