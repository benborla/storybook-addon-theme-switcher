import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: [
    "./src/components/Indicators.tsx",
    "./src/components/ThemeSelector.tsx",
    "./src/decorators/withBrandThemesSwitcher.ts",
    "./src/helpers/index.ts",
    "./src/types/index.ts",
    "./src/constants.ts",
    "./src/index.ts",
    "./src/manager.tsx",
    "./src/preview.tsx",
    "./src/typings.d.ts",
  ],
  splitting: false,
  minify: !options.watch,
  format: ["cjs", "esm"],
  dts: {
    resolve: true,
  },
  treeshake: true,
  sourcemap: true,
  clean: true,
  platform: "browser",
  esbuildOptions(options) {
    options.conditions = ["module"];
  },
}));
