// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { ValueValidator } from "./value.ts";
import { ValidationFailure } from "../types.ts";
import { PatternValidator } from "./string/pattern.ts";
import {
  assert,
  assertEquals,
  assertFalse,
  describe,
  it,
} from "../_dev_deps.ts";

describe("ValueValidator", () => {
  it("is should be return true if input contains enumerator", () => {
    const validator = new ValueValidator(new PatternValidator(/^a/));
    assert(validator.is({ x: "a", xx: "aa" }));

    assertFalse(validator.is({ x: "" }));
  });

  it("validate should yield failures", () => {
    const validator = new ValueValidator(new PatternValidator(/^a/));

    assertEquals([...validator.validate({ b: "", bb: "" })], [
      new ValidationFailure("", { instancePath: ["b"] }),
      new ValidationFailure("", { instancePath: ["bb"] }),
    ]);
  });

  it("should represent of", () => {
    const validator = new ValueValidator(new PatternValidator(/^a/));

    assertEquals(validator.toString(), "value of pattern of \`\/^a\/\`");
  });
});
