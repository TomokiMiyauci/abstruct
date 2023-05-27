// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { assert, Err, Ok, validate, ValidationError } from "./validation.ts";
import type { ValidationFailure, Validator } from "./types.ts";
import {
  assertEquals,
  assertFalse,
  assertIsError,
  assertThrows,
  describe,
  it,
} from "./_dev_deps.ts";

const v: Validator = {
  validate: () => [],
  is: (_: unknown): _ is unknown => true,
};

describe("assert", () => {
  it("should return void if there are not validation errors", () => {
    assertFalse(assert(v, ""));
    assertFalse(assert(v, "", { failFast: true }));
    assertFalse(assert(v, "", { maxErrors: 1 }));
    assertFalse(assert(v, "", { message: "test" }));
  });

  it("should throw AggregateError by default", () => {
    const v1: Validator = {
      ...v,
      validate: () => [{ message: "test1", instancePath: [] }, {
        message: "test2",
        instancePath: ["a", "b", "c"],
      }],
    };

    let err;

    try {
      assertFalse(assert(v1, ""));
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, AggregateError, "");
      assertEquals(err.errors, [
        new ValidationError(`test1`),
        new ValidationError(`test2\ninstance path: a.b.c`, {
          instancePath: ["a", "b", "c"],
        }),
      ]);
    }
  });

  it("should override AggregateError if pass error", () => {
    const v1: Validator = {
      ...v,
      validate: () => [{ message: "test1", instancePath: [] }, {
        message: "test2",
        instancePath: ["a", "b", "c"],
      }],
    };

    let err;

    class CustomError extends AggregateError {
      override name = "CustomError";
    }

    try {
      assertFalse(assert(v1, "", { error: CustomError }));
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, CustomError);
    }
  });

  it("should pass message", () => {
    const v1: Validator = {
      ...v,
      validate: () => [{ message: "test1", instancePath: [] }, {
        message: "test2",
        instancePath: ["a", "b", "c"],
      }],
    };

    let err;

    try {
      assertFalse(assert(v1, "", { message: "test" }));
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, AggregateError, "test");
    }
  });

  it("should be limit number of error", () => {
    const v1: Validator = {
      ...v,
      validate: () => [{ message: "test1", instancePath: [] }, {
        message: "test2",
        instancePath: ["a", "b", "c"],
      }],
    };

    let err;

    try {
      assertFalse(assert(v1, "", { maxErrors: 1 }));
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, AggregateError);
      assertEquals(err.errors.length, 1);
      assertEquals(err.errors[0].message, "test1");
    }
  });

  it("should throw ValidationError if failFast is true", () => {
    const v1: Validator = {
      ...v,
      validate: () => [{
        message: "test2",
        instancePath: ["a", "b", "c"],
      }, { message: "test1", instancePath: [] }],
    };

    let err;

    try {
      assertFalse(assert(v1, "", { failFast: true }));
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, ValidationError, "test2\ninstance path: a.b.c");
      assertEquals(
        err,
        new ValidationError("test2\ninstance path: a.b.c", {
          instancePath: ["a", "b", "c"],
        }),
      );
    }
  });

  it("should override Error if error is ctor", () => {
    const v1: Validator = {
      ...v,
      validate: () => [{
        message: "test2",
        instancePath: ["a", "b", "c"],
      }, { message: "test1", instancePath: [] }],
    };

    let err;

    try {
      assertFalse(assert(v1, "", { failFast: true, error: Error }));
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, Error, "test2\ninstance path: a.b.c");
      assertEquals(
        err,
        new Error("test2\ninstance path: a.b.c"),
      );
    }
  });

  it("should override message", () => {
    const v1: Validator = {
      ...v,
      validate: () => [{
        message: "test2",
        instancePath: ["a", "b", "c"],
      }, { message: "test1", instancePath: [] }],
    };

    let err;

    try {
      assertFalse(assert(v1, "", { failFast: true, message: "test!!!" }));
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, ValidationError, "test!!!");
    }
  });
});

describe("validate", () => {
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
