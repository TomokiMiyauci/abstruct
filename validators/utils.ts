// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { interpolate } from "../utils.ts";
import error from "./error.json" assert { type: "json" };
import type { Display } from "../types.ts";

export function displayOr(
  v1: unknown,
  v2: unknown,
  ...values: readonly unknown[]
): string;
export function displayOr(
  ...args: readonly [unknown, unknown, ...readonly unknown[]]
): string {
  const head = args.slice(0, -1);
  const last = args.slice(-1)[0];

  return head.join(", ") + " or " + last;
}

export function shouldBe(
  this: Display,
): string {
  return interpolate(error.should_be, [this]);
}

export function shouldBeBut(
  this: Display,
  { input }: { input: unknown },
): string {
  return interpolate(error.should_be_but, [this, input]);
}
