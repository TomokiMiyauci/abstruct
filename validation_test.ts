// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { assert, Err, Ok, validate, ValidationError } from "./validation.ts";
import type { ValidationFailure, Validator } from "./types.ts";
import {
  assertEquals,
  assertFalse,
  assertIsError,
  assertMatch,
  assertThrows,
  describe,
  it,
} from "./_dev_deps.ts";

const v: Validator = {
  validate: () => [],
  is: (_: unknown): _ is unknown => true,
};

describe("assert", () => {
  it("should return void if there are not validation failures", () => {
    assertFalse(assert(v, ""));
    assertFalse(assert(v, "", { failSlow: true }));
    assertFalse(assert(v, "", { failSlow: true, maxFailures: 1 }));
  });

  it("should expose instance path info by default", () => {
    let err;
    try {
      assert(
        { ...v, validate: () => [{ message: "test", instancePath: ["a"] }] },
        "",
      );
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, ValidationError);
      assertMatch(err.message, /^test\ninstance path: a$/);
    }
  });

  it("should not expose instance path info if the instance path is empty", () => {
    let err;
    try {
      assert(
        { ...v, validate: () => [{ message: "test", instancePath: [] }] },
        "",
      );
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, ValidationError);
      assertMatch(err.message, /^test$/);
    }
  });

  it("should hide instance path info", () => {
    let err;
    try {
      assert(
        { ...v, validate: () => [{ message: "test", instancePath: ["a"] }] },
        "",
        { pathInfo: { hide: true } },
      );
    } catch (e) {
      err = e;
    } finally {
      assertIsError(err, ValidationError);
      assertMatch(err.message, /^test$/);
    }
  });

  describe("fail fast", () => {
    it("should throw ValidationError if failFast is false or default", () => {
      const v1: Validator = {
        ...v,
        validate: () => [{
          message: "test2",
          instancePath: ["a", "b", "c"],
        }, { message: "test1", instancePath: [] }],
      };

      let err;

      try {
        assertFalse(assert(v1, ""));
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
        assertFalse(
          assert(v1, "", { validation: { error: Error } }),
        );
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
          message: "",
          instancePath: ["a", "b", "c"],
        }, { message: "test1", instancePath: [] }],
      };

      let err;

      try {
        assertFalse(
          assert(v1, "", { validation: { message: "test!!!" } }),
        );
      } catch (e) {
        err = e;
      } finally {
        assertIsError(err, ValidationError, "test!!!\ninstance path: a.b.c");
      }
    });
  });

  describe("fail slow", () => {
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
        assertFalse(assert(v1, "", { failSlow: true }));
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
        assertFalse(
          assert(v1, "", {
            failSlow: true,
            aggregation: { error: CustomError },
          }),
        );
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
        assertFalse(
          assert(v1, "", { failSlow: true, aggregation: { message: "test" } }),
        );
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
        assertFalse(assert(v1, "", { failSlow: true, maxFailures: 1 }));
      } catch (e) {
        err = e;
      } finally {
        assertIsError(err, AggregateError);
        assertEquals(err.errors.length, 1);
        assertEquals(err.errors[0].message, "test1");
      }
    });
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
        { maxFailures: 1 },
      ),
      new Err<[ValidationFailure]>([{ message: "error", instancePath: [] }]),
    );
  });

  it("should throw error is maxFailures is not positive integer", () => {
    assertThrows(() => validate(v, "", { maxFailures: 0 }));
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
