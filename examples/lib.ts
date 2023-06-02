// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { and, assert, int, nonNegative, optional } from "../mod.ts";

interface MyModuleOptions {
  maxTasks: number;
}

const NonNegativeInteger = /* @__PURE__ */ and(int, nonNegative);
const Options = /* @__PURE__ */ optional<MyModuleOptions>(
  { maxTasks: NonNegativeInteger },
);

export function myModule(
  input: unknown,
  options: Readonly<Partial<MyModuleOptions>> = {},
): void {
  assert(Options, options);

  console.log(input);
}

export function anotherModule(): void {}
