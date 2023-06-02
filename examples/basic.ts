// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.

import { assert, boolean, number, props, string } from "../mod.ts";

const User = props({
  id: string,
  name: string,
  age: number,
  is_admin: boolean,
});

const data = {
  id: 1,
  name: "Tomoki Miyauchi",
  age: 42,
  is_admin: true,
};

assert(User, data);
