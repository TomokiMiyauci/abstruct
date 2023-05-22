import { AssertiveScalarValidator } from "../utils.ts";
import { displayOr, shouldBeBut } from "./utils.ts";

export class EnumValidator<const T>
  extends AssertiveScalarValidator<unknown, T> {
  values: [T, T, ...T[]];
  constructor(v1: T, v2: T, ...values: readonly T[]) {
    super();
    super.expect(shouldBeBut);
    this.values = [v1, v2, ...values];
  }

  is(input: unknown): input is T {
    return (this.values as unknown[]).includes(input);
  }

  toString(): string {
    return `one of ${displayOr(...this.values)}`;
  }
}
