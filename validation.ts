// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isEmpty, isString } from "./deps.ts";
import {
  Err,
  Ok,
  Result,
  Validation,
  ValidationError,
  Validator,
} from "./types.ts";
import { take } from "./iter_utils.ts";

/** Whether the input satisfy the schema or not. */
export function is<In = unknown, In_ extends In = In>(
  validator: Validation<In, In_>,
  input: In,
): input is In_ {
  const iterable = validator.validate(input);

  return isEmpty(iterable);
}

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
  validator: Validation<In, In_>,
  input: In,
  options?: SingleAssertOptions,
): asserts input is In_;

/**
 * @throws {AggregateError}
 */
export function assert<In = unknown, In_ extends In = In>(
  validator: Validation<In, In_>,
  input: In,
  options?: MultipleAssertOptions,
): asserts input is In_;

export function assert(
  validator: Validator,
  input: unknown,
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
    const e = result.errors[0]!;
    const {
      error,
      message = makeMsg(e, { rootName }),
      cause,
    } = options;

    if (error) throw captured(new error(message, { cause }));

    e.cause = cause;

    if (isString(message)) e.message = message;

    throw captured(e);
  }

  options.error ??= AggregateError;

  throw captured(
    new options.error(
      result.errors.map((e) => exposePath(e, rootName)).map(captured),
      message,
      { cause },
    ),
  );

  // deno-lint-ignore ban-types
  function captured<T extends Object>(error: T): T {
    if (releaseStackTrace) return error;

    Error.captureStackTrace(error, assert);

    return error;
  }
}

export interface ValidateOptions extends ErrorOptions {
  /**
   * @default Infinity
   */
  maxErrors?: number;
}

/**
 * @throws {RangeError} If the {@link ValidateOptions.maxErrors} is not positive integer.
 */
export function validate<In = unknown, In_ extends In = In>(
  validation: Validation<In, In_>,
  input: In,
  options: ValidateOptions = {},
): Result<In_> {
  const errors = [...take(validation.validate(input), options.maxErrors)]
    .map(setCause);

  if (!errors.length) return new Ok(input as In_);

  return new Err(errors);

  function setCause<T extends Error>(error: T): T {
    error.cause ??= options.cause;

    return error;
  }
}

function makeMsg(
  error: ValidationError,
  options: { rootName?: string } = {},
): string {
  const { rootName: name } = options;
  const { instancePath, message } = error;
  const pathSection = instancePath.length
    ? "\n" + new InstancePath(instancePath, { name })
    : "";

  return message + pathSection;
}

function exposePath(
  error: ValidationError,
  rootPathDisplay?: string,
): ValidationError {
  error.message = makeMsg(error, { rootName: rootPathDisplay });

  return error;
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
