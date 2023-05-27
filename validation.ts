// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { type ValidationFailure, Validator } from "./types.ts";
import { take } from "./iter_utils.ts";

export interface AssertOptions extends ErrorOptions {
  message?: string;

  /**
   * @default "input"
   */
  objectName?: string;

  /** Whether release internal stack trace or not.
   * @default false
   */
  releaseStackTrace?: boolean;
}

export interface SingleAssertOptions extends AssertOptions {
  once: true;
  error?: ErrorConstructor;
}

export interface MultipleAssertOptions extends AssertOptions {
  error?: AggregateErrorConstructor;
}

/** Assert schema.
 * @throws {ValidationError}
 */
export function assert<In = unknown, In_ extends In = In>(
  validator: Validator<In, In_>,
  input: In,
  options?: SingleAssertOptions,
): asserts input is In_;

/**
 * @throws {AggregateError}
 */
export function assert<In = unknown, In_ extends In = In>(
  validator: Validator<In, In_>,
  input: In,
  options?: MultipleAssertOptions,
): asserts input is In_;

export function assert(
  validator: Validator,
  input: Readonly<unknown>,
  options: SingleAssertOptions | MultipleAssertOptions = {},
): asserts input {
  const {
    message,
    cause,
    objectName: rootName = "input",
    releaseStackTrace = false,
  } = options;
  const hasOnce = "once" in options;
  const maxErrors = hasOnce ? 1 : undefined;
  const result = validate(validator, input, { maxErrors });

  if (result.isOk()) return;

  if (hasOnce) {
    const failure = result.value[0]!;
    const {
      error = ValidationError,
      message = makeMsg(failure, { rootName }),
      cause,
    } = options;
    const e = new error(message, { cause, instancePath: failure.instancePath });

    throw captured(e);
  }

  options.error ??= AggregateError;

  const errors = result.value
    .map((failure) =>
      new ValidationError(makeMsg(failure, { rootName }), {
        instancePath: failure.instancePath,
      })
    ).map(captured);

  throw captured(new options.error(errors, message, { cause }));

  // deno-lint-ignore ban-types
  function captured<T extends Object>(error: T): T {
    if (releaseStackTrace) return error;

    Error.captureStackTrace(error, assert);

    return error;
  }
}

/** Validate options. */
export interface ValidateOptions {
  /** The maximum number of {@link ValidationFailure}.
   * It should be positive integer.
   * @default Number.MAX_SAFE_INTEGER
   */
  maxErrors?: number;
}

/** The `validate` executes the {@link Validator} and returns a {@link Result} type. If validation
 * succeeds, it returns {@link Ok}. If it fails, it returns {@link Err}.
 *
 * If {@link Ok}, the value after narrowing of the type is stored.
 *
 * @example
 * ```ts
 * import {
 *   fixedArray,
 *   number,
 *   string,
 *   validate,
 *   type ValidationFailure,
 *   type Validator,
 * } from "https://deno.land/x/abstruct@$VERSION/mod.ts";
 * import type {
 *   Assert,
 *   Has,
 *   IsExact,
 * } from "https://deno.land/std/testing/types.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const Tuple = fixedArray(string, number);
 *
 * type doTest = Assert<
 *   Has<typeof Tuple, Validator<[unknown, unknown], [string, number]>>,
 *   true
 * >;
 *
 * const result = validate(Tuple, [0, ""]);
 * declare const failure: ValidationFailure;
 *
 * if (result.isOk()) {
 *   type doTest = Assert<IsExact<typeof result.value, [string, number]>, true>;
 * } else {
 *   assertEquals(result.value, [failure, failure]);
 * }
 *
 * ```
 *
 * ## maxErrors
 * The maximum number of {@link ValidationFailure}. It should be positive integer.
 * The default is `Number.MAX_SAFE_INTEGER`.
 *
 * Example of fail fast:
 * ```ts
 * import {
 *   fixedArray,
 *   number,
 *   string,
 *   validate,
 *   type ValidationFailure,
 *   type Validator,
 * } from "https://deno.land/x/abstruct@$VERSION/mod.ts";
 * import type {
 *   Assert,
 *   Has,
 *   IsExact,
 * } from "https://deno.land/std/testing/types.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const Tuple = fixedArray(string, number);
 * const result = validate(Tuple, [0, ""], { maxErrors: 1 });
 * declare const failure: ValidationFailure;
 *
 * if (result.isErr()) {
 *   assertEquals(result.value, [failure]);
 * }
 * ```
 *
 * Because the validator performs lazy evaluation, limiting the number of errors
 * improves performance.
 *
 * @throws {RangeError} If the {@link ValidateOptions.maxErrors} is not positive integer.
 */
export function validate<In = unknown, A extends In = In>(
  validator: Readonly<Validator<In, A>>,
  input: Readonly<In>,
  options: Readonly<ValidateOptions> = {},
): Result<A, ValidationFailure[]> {
  const failures = [...take(validator.validate(input), options.maxErrors)];

  if (!failures.length) return new Ok(input as A);

  return new Err(failures);
}

/** Validation error. */
export class ValidationError extends Error {
  /** The path to a part of the instance. */
  instancePath: string[];

  override name = "ValidationError";

  constructor(
    message?: string,
    options: ValidationErrorOptions = {},
  ) {
    super(message, options);
    this.instancePath = options.instancePath ?? [];
  }
}

/** Result of OK API. */
export class Ok<T> {
  /** Node type. */
  type: "ok" = "ok";

  /** Actual data. */
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  /** Whether the {@link Result} is {@link Ok} or not. */
  isOk(): this is Ok<T> {
    return true;
  }

  /** Whether the {@link Result} is {@link Err} or not. */
  isErr(): this is Err<never> {
    return false;
  }
}

/** Result of Error API. */
export class Err<E> {
  /** Node type. */
  type: "error" = "error";

  /** Actual error. */
  value: E;

  constructor(value: E) {
    this.value = value;
  }

  /** Whether the {@link Result} is {@link Ok} or not. */
  isOk(): this is Ok<never> {
    return false;
  }

  /** Whether the {@link Result} is {@link Err} or not. */
  isErr(): this is Err<E> {
    return true;
  }
}

/** Represent {@link Ok} or {@link Err}.  */
export type Result<T, E> = Ok<T> | Err<E>;

/** Validation error options. */
export interface ValidationErrorOptions extends ErrorOptions {
  /** Path to instance. */
  instancePath?: string[];
}

function makeMsg(
  failure: ValidationFailure,
  options: { rootName?: string } = {},
): string {
  const { rootName: name } = options;
  const { instancePath, message } = failure;
  const pathSection = instancePath.length
    ? "\n" + new InstancePath(instancePath, { name })
    : "";

  return message + pathSection;
}

interface InstancePathOptions {
  name?: string;
}

class InstancePath {
  paths: readonly PropertyKey[];
  name: string;

  constructor(
    paths: readonly PropertyKey[],
    options?: InstancePathOptions,
  ) {
    this.paths = paths;
    this.name = options?.name ?? "";
  }

  toString(): string {
    const str = [this.name, ...this.paths]
      .filter(Boolean)
      .join(".");

    return `instance path: ${str}`;
  }
}
