import { ScalarValidator } from "../utils.ts";
import { displayOr } from "./utils.ts";

export class EnumValidator<const T> extends ScalarValidator<unknown, T> {
  values: [T, T, ...T[]];
  constructor(v1: T, v2: T, ...values: readonly T[]) {
    super();
    this.values = [v1, v2, ...values];
  }

  is(input: unknown): input is T {
    return (this.values as unknown[]).includes(input);
  }

  override toString(): string {
    return `one of ${displayOr(...this.values)}`;
  }
}
