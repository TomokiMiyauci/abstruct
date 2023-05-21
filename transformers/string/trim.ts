// Copyright 2023-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import type { Transformer } from "../../types.ts";

export class TrimTransformer implements Transformer<string, string> {
  transform(input: string): string {
    return input.trim();
  }
}
