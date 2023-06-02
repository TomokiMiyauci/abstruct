// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { PropertyKeyValidator } from "./property_key.ts";
import { PatternValidator } from "../string/pattern.ts";
import { assertEquals, describe, it } from "../../_dev_deps.ts";

describe("PropertyKeyValidator", () => {
  it("validate should yield failures", () => {
    const validator = new PropertyKeyValidator(new PatternValidator(/^a/));

    assertEquals([...validator.validate({ b: "", bb: "" })], [
      { message: "", instancePath: ["b"] },
      { message: "", instancePath: ["bb"] },
    ]);
  });

  it("should represent of", () => {
    const validator = new PropertyKeyValidator(new PatternValidator(/^a/));

    assertEquals(validator.toString(), "key of pattern of \`\/^a\/\`");
  });
});
