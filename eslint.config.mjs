import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // 1. Extend JS/TS recommended configurations
  ...tseslint.configs.recommended,

  // 2. React flat configurations
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],

  // 3. React Hooks flat configuration
  hooksPlugin.configs.flat.recommended,

  // 4. Next.js flat configuration & Custom settings/rules
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
      // Warn on unused variables instead of failing the build
      "@typescript-eslint/no-unused-vars": "warn",
      // Disable strict set-state-in-effect rule which is too restrictive for standard patterns
      "react-hooks/set-state-in-effect": "off",
    },
  },

  // 5. Global ignores
  {
    ignores: [".next/", "node_modules/", "dist/", "out/", "build/"],
  }
);
