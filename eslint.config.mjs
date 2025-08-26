module.exports = {
  // Defines the environments your code will run in.
  // This helps ESLint understand global variables available in those environments.
  env: {
    browser: true, // for browser global variables like `window` and `document`
    es2021: true,  // enables ES2021 globals and syntax
    node: true,    // for Node.js global variables and Node.js scoping
  },
  // Extends a set of recommended ESLint configurations.
  extends: [
    'eslint:recommended',          // ESLint's built-in recommended rules
    'plugin:react/recommended',    // Recommended rules for React from eslint-plugin-react
    'plugin:react-hooks/recommended', // Enforces Rules of Hooks
  ],
  // Specifies the parser options for ESLint.
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    ecmaVersion: 'latest', // Use the latest ECMAScript standard
    sourceType: 'module',  // Allows for the use of imports
  },
  // Defines which plugins to use.
  plugins: [
    'react',
  ],
  // Settings to be shared across all the plugin rules.
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: 'detect',
    },
  },
  // The core of the configuration: customizing individual rules.
  rules: {
    // --- This is the rule you asked to disable ---
    // It turns off the requirement to validate props with prop-types.
    'react/prop-types': 'off',

    // Optional: For React 17+ you don't need to import React into every file.
    // This rule can be turned off if you are using the new JSX transform.
    'react/react-in-jsx-scope': 'off',

    // You can add or override other rules here.
    // For example, to treat unused variables as a warning instead of an error:
    'no-unused-vars': 'warn',
  },
};
