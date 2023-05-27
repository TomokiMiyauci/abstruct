// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { Err, Ok, validate, ValidationError } from "./validation.ts";
import type { ValidationFailure, Validator } from "./types.ts";
import { assertEquals, assertThrows, describe, it } from "./_dev_deps.ts";

describe("validate", () => {
  const v: Validator = {
    validate: () => [],
    is: (_: unknown): _ is unknown => true,
  };

  it("should return ok", () => {
    assertEquals(validate(v, ""), new Ok(""));
  });

  it("should return err", () => {
    assertEquals(
      validate({
        ...v,
        validate: () => [{ message: "error", instancePath: ["a", "b", "c"] }],
      }, ""),
      new Err<[ValidationFailure]>([{
        message: "error",
        instancePath: ["a", "b", "c"],
      }]),
    );
  });

  it("should return err what count of number is strict by max errors", () => {
    assertEquals(
      validate(
        {
          ...v,
          validate: () => [
            { message: "error", instancePath: [] },
            { message: "error2", instancePath: [] },
          ],
        },
        "",
        { maxErrors: 1 },
      ),
      new Err<[ValidationFailure]>([{ message: "error", instancePath: [] }]),
    );
  });

  it("should throw error is maxError is not positive integer", () => {
    assertThrows(() => validate(v, "", { maxErrors: 0 }));
  });
});

describe("ValidationError", () => {
  it("should has fields", () => {
    const options = {
      cause: {},
      instancePath: [],
    };
    const error = new ValidationError("test", options);

    assertEquals(error.instancePath, options.instancePath);
    assertEquals(error.message, "test");
    assertEquals(error.cause, options.cause);
    assertEquals(error.name, "ValidationError");
  });
});

describe("Ok", () => {
  it("should return Ok container", () => {
    const value = "test";
    const ok = new Ok(value);

    assertEquals(ok.type, "ok");
    assertEquals(ok.value, value);
    assertEquals(ok.isOk(), true);
    assertEquals(ok.isErr(), false);
  });
});

describe("Err", () => {
  it("should return Err container", () => {
    const value = "test";
    const err = new Err(value);

    assertEquals(err.type, "error");
    assertEquals(err.value, value);
    assertEquals(err.isOk(), false);
    assertEquals(err.isErr(), true);
  });
});
