// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { and, assert, gte, instance, lte, validDate } from "../mod.ts";

const ValidDate = and(
  instance(Date),
  validDate,
  gte(new Date("1970/1/1")),
  lte(new Date("2038/1/19")),
);

const input: unknown = null;

assert(ValidDate, input);
assert(ValidDate, new Date("invalid"));
assert(ValidDate, new Date("2000/1/1"));
