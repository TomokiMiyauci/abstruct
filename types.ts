// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isString } from "./deps.ts";

/** Validator API. */
export interface Validator<in In = unknown, out A extends In = In> {
  /** Validates the input and yield validation errors if exists. */
  validate: (input: In) => Iterable<ValidationFailure>;

  /** Whether the input is valid or not. */
  is: (input: In) => input is A;
}

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
    options?: Readonly<ValidationFailureOptions>,
  ) {
    this.message = message ?? "";
    this.instancePath = [...options?.instancePath ?? []];
  }
}

export interface ValidationFailureOptions {
  instancePath?: readonly string[];
}

/** Validation context API. */
export interface ValidationContext<In = unknown> {
  /** The actual input. */
  input: In;
}

export interface Transformer<in In = unknown, out Out = In> {
  transform: (input: In) => Out;
}

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
