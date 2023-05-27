// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isNotEmpty } from "./deps.ts";
import { type ValidationFailure, Validator } from "./types.ts";
import { take } from "./iter_utils.ts";

/** Assert options. */
export interface AssertOptions extends ErrorOptions {
  /** Error constructor. */
  error?: NewableFunction;

  /** Error message. */
  message?: string;

  /** Whether to perform the assertion fail fast or not.
   * @default false
   */
  failFast?: boolean;
}

/** Eager assert options. */
export interface EagerAssertOptions extends AssertOptions {
  /**
   * @default ValidationError
   */
  error?: { new (message?: string, options?: ErrorOptions): Error };
  failFast: true;
}

/** Lazy assert options. */
export interface LazyAssertOptions extends AssertOptions, ValidateOptions {
  /**
   * @default AggregateError
   */
  error?: {
    new (
      // deno-lint-ignore no-explicit-any
      errors: Iterable<any>,
      message?: string,
      options?: ErrorOptions,
    ): Error;
  };
  failFast?: false;
}

/** Assert with validator.
 *
 * @throws {AggregateError} If assertion is fail.
 * @throws {ValidationError} If assertion is fail and {@link options.failFast} is true.
 * @throws {RangeError} If options.maxErrors is not positive integer.
 */
export function assert<In = unknown, A extends In = In>(
  validator: Readonly<Validator<In, A>>,
  input: Readonly<In>,
  options: Readonly<EagerAssertOptions | LazyAssertOptions> = {},
): asserts input is A {
  const {
    message,
    cause,
    failFast,
    error,
  } = options;
  const maxErrors = failFast ? 1 : options.maxErrors;
  const result = validate(validator, input, { maxErrors });

  if (result.isOk()) return;

  if (failFast) {
    const failure = result.value[0];
    const ErrorCtor = error ?? ValidationError;
    const e = new ErrorCtor(message ?? makeMsg(failure), { cause });

    throw captured(e);
  }

  const errors = result.value
    .map((failure) =>
      new ValidationError(makeMsg(failure), {
        instancePath: failure.instancePath,
      })
    ).map(captured);
  const ErrorCtor = error ?? AggregateError;

  throw captured(new ErrorCtor(errors, message, { cause }));

  // deno-lint-ignore ban-types
  function captured<T extends Object>(error: T): T {
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
): Result<A, [ValidationFailure, ...ValidationFailure[]]> {
  const failures = [...take(validator.validate(input), options.maxErrors)];

  if (isNotEmpty(failures)) return new Err(failures);

  return new Ok(input as A);
}

/** Validation error.
 *
 * @example
 * ```ts
 * import { ValidationError } from "https://deno.land/x/abstruct@$VERSION/validation.ts";
 *
 * const error = new ValidationError("<message>", {
 *   instancePath: ["a", "b", "c"],
 * });
 * ```
 */
export class ValidationError extends Error {
  /** The path to a part of the instance. */
  instancePath: string[];

  /** Error name. */
  override name = "ValidationError";

  constructor(
    message?: string,
    options: ValidationErrorOptions = {},
  ) {
    super(message, options);
    this.instancePath = options.instancePath ?? [];
  }
}

class Container<const T> {
  /** Actual value. */
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}

/** Result of OK API. */
export class Ok<const T> extends Container<T> {
  /** Node type. */
  type: "ok" = "ok";

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
export class Err<const E> extends Container<E> {
  /** Node type. */
  type: "error" = "error";

  /** Whether the {@link Result} is {@link Ok} or not. */
  isOk(): this is Ok<never> {
    return false;
  }

  /** Whether the {@link Result} is {@link Err} or not. */
  isErr(): this is Err<E> {
    return true;
  }
}

/** Represent either success({@link Ok}) or failure({@link Err}).  */
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
