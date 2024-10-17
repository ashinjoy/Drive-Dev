import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { globals: globals.node },
  rules:{
    "no-console":"off",
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
},
  pluginJs.configs.recommended,
];