// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { NotValidator } from "./not.ts";
import { EqualityValidator } from "./equality.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../../_dev_deps.ts";

describe("NotValidator", () => {
  it("is should return inverse of validator result", () => {
    assert(new NotValidator(new EqualityValidator(0)).is(1));

    assertFalse(new NotValidator(new EqualityValidator(0)).is(0));
  });

  it("validate should yield if validator is ok", () => {
    assertEquals([...new NotValidator(new EqualityValidator(0)).validate(0)], [
      { message: "", instancePath: [] },
    ]);
  });

  it("should represent of", () => {
    assertEquals(
      new NotValidator(new EqualityValidator(0)).toString(),
      `not 0`,
    );
    assertEquals(
      new NotValidator(new EqualityValidator("abc")).toString(),
      `not "abc"`,
    );
  });
});
