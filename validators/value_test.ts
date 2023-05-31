// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { ValueValidator } from "./value.ts";
import { ValidationFailure } from "../types.ts";
import { PatternValidator } from "./string/pattern.ts";
import { assertEquals, describe, it } from "../_dev_deps.ts";

describe("ValueValidator", () => {
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
