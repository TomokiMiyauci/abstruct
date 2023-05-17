import { Assert } from "../types.ts";
import { display, format, ScalarValidator } from "../utils.ts";
import error from "./error.json" assert { type: "json" };

@display("never")
export class NeverValidator extends ScalarValidator
  implements Assert<unknown, never> {
  declare [Assert.symbol]: never;
  constructor() {
    super();
    super.expect(() => format(error.should_be, this));
  }

  is(): boolean {
    return false;
  }
}
