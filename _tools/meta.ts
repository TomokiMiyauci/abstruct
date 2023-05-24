import { BuildOptions } from "https://deno.land/x/dnt@0.34.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: {},
  compilerOptions: {
    lib: ["esnext"],
  },
  typeCheck: true,
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  package: {
    name: "abstruct",
    version,
    description: "Abstract structure for JavaScript data validation",
    keywords: [
      "assert",
      "check",
      "validation",
      "validate",
      "struct",
      "structure",
      "schema",
      "valid",
      "validator",
      "expect",
    ],
    license: "MIT",
    homepage: "https://github.com/TomokiMiyauci/abstruct",
    repository: {
      type: "git",
      url: "git+https://github.com/TomokiMiyauci/abstruct.git",
    },
    bugs: {
      url: "https://github.com/TomokiMiyauci/abstruct/issues",
    },
    sideEffects: false,
    type: "module",
    devDependencies: {
      "@types/node": "latest",
    },
  },
  packageManager: "pnpm",
  mappings: {
    "https://deno.land/x/isx@1.3.1/iterable/is_empty.ts": {
      name: "@miyauci/isx",
      version: "1.3.1",
      subPath: "iterable/is_empty.js",
    },
    "https://deno.land/x/isx@1.3.1/iterable/is_not_empty.ts": {
      name: "@miyauci/isx",
      version: "1.3.1",
      subPath: "iterable/is_not_empty.js",
    },
    "https://deno.land/x/isx@1.3.1/iterable/is_single.ts": {
      name: "@miyauci/isx",
      version: "1.3.1",
      subPath: "iterable/is_single.js",
    },
    "https://deno.land/x/isx@1.3.1/is_string.ts": {
      name: "@miyauci/isx",
      version: "1.3.1",
      subPath: "is_string.js",
    },
    "https://deno.land/x/isx@1.3.1/is_non_nullable.ts": {
      name: "@miyauci/isx",
      version: "1.3.1",
      subPath: "is_non_nullable.js",
    },
    "https://deno.land/x/isx@1.3.1/number/is_positive_number.ts": {
      name: "@miyauci/isx",
      version: "1.3.1",
      subPath: "number/is_positive_number.js",
    },
    "https://deno.land/x/isx@1.3.1/date/is_valid_date.ts": {
      name: "@miyauci/isx",
      version: "1.3.1",
      subPath: "date/is_valid_date.js",
    },
    "https://esm.sh/escape-string-regexp@5.0.0?pin=v122": {
      name: "escape-string-regexp",
      version: "5.0.0",
    },
  },
});
