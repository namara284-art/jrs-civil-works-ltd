import next from "eslint-config-next";

/** Flat config — eslint-config-next 16 ships flat presets directly. */
const eslintConfig = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**", "source-assets/**", "public/**"],
  },
];

export default eslintConfig;
