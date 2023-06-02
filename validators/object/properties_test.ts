// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { PropertiesValidator } from "./properties.ts";
import { TypeValidator } from "../operators/typeof.ts";
import { assertEquals, describe, it } from "../../_dev_deps.ts";

describe("PropertiesValidator", () => {
  it("validate should yield failures", () => {
    assertEquals(
      [...new PropertiesValidator({ a: new TypeValidator("string") }).validate({
        a: 0,
      })],
      [{ message: "", instancePath: ["a"] }],
    );

    assertEquals(
      [...new PropertiesValidator({
        a: new TypeValidator("string"),
        [Symbol.iterator]: new TypeValidator("function"),
      }).validate({
        a: 0,
        [Symbol.iterator]: "",
      })],
      [{ message: "", instancePath: ["a"] }, {
        message: "",
        instancePath: [Symbol.iterator],
      }],
    );
  });

  it("should represent of", () => {
    assertEquals(
      new PropertiesValidator({ a: new TypeValidator("string") }).toString(),
      "{a: string}",
    );
    assertEquals(
      new PropertiesValidator({
        a: new TypeValidator("string"),
        [Symbol.iterator]: new TypeValidator("number"),
      }).toString(),
      "{a: string, Symbol(Symbol.iterator): number}",
    );
  });
});
