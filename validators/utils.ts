// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { format } from "../utils.ts";
import error from "./error.json" assert { type: "json" };
import type { Display } from "../types.ts";

export function displayOr(input: readonly unknown[]): string {
  const head = input.slice(0, -1);
  const last = input.slice(-1)[0];

  return head.join(", ") + " or " + last;
}

export function shouldBe(
  this: Display,
): string {
  return format(error.should_be, this);
}

export function shouldBeBut(
  this: Display,
  { input }: { input: unknown },
): string {
  return format(error.should_be_but, this, input);
}
