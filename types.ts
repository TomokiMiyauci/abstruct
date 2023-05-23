// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isString } from "./deps.ts";

/** Validator API. */
export interface Validator<in In = unknown> {
  /** Validates the input and yield validation errors if exists. */
  validate: (input: In) => Iterable<ValidationFailure>;
}

export type Validation<In = unknown, In_ extends In = In> = In extends In_
  ? Validator<In>
  : AssertiveValidator<In, In_>;

export interface Display {
  toString(): string;
}

/** Validation failure. */
export class ValidationFailure {
  /** The validation failure message. */
  message: string;

  /** The path to a part of the instance. */
  instancePath: string[];

  constructor(
    message?: string,
    options?: Readonly<{ instancePath: string[] }>,
  ) {
    this.message = message ?? "";
    this.instancePath = options?.instancePath ?? [];
  }
}

export interface Transformer<in In = unknown, out Out = In> {
  transform: (input: In) => Out;
}

/** Assert API for validated data type. */
export interface Assert<T = unknown> {
  [Assert.symbol]: T;
}

export class Assert {
  static readonly symbol: unique symbol;
}

export interface AssertiveValidator<In = unknown, In_ extends In = In>
  extends Validator<In>, Assert<In_> {}

export interface Reporter<T = unknown> {
  report(context: T): string;

  expect(message: string): this;
  expect(report: Reporter["report"]): this;
}

export class Reporter<T = unknown> {
  #messageFn?: Reporter<T>["report"];

  report(context: T): string {
    return this.#messageFn?.(context) ?? "";
  }

  expect(messageOrReport: string | Reporter<T>["report"]): this {
    const fn = isString(messageOrReport)
      ? (() => messageOrReport) as Reporter<T>["report"]
      : messageOrReport;

    this.#messageFn = fn;

    return this;
  }
}
