module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint', 'react-hooks'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },

  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    // suppress errors for missing 'import React' in files
    'react-hooks/rules-of-hooks': 'error', // hook need to be toplevel
    'react-hooks/exhaustive-deps': 'warn', // for useEffect and useMemo dependency
    // 'no-empty-function': 'on', // for allowing empty function
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': [
      // This will enforce the use of explicit return types for all functions
      'error',
      {
        allowArgumentsExplicitlyTypedAsAny: true,
        allowedNames: ['Component'],
        allowHigherOrderFunctions: true,
        allowTypedFunctionExpressions: true
      }
    ],
    'no-unused-vars': [
      'error',
      {
        // which function arguments to ignore when checking for unused variables
        argsIgnorePattern: '^_',
        // which variables to ignore when checking for unused variables
        varsIgnorePattern: '^_'
      }
    ],
    'react/react-in-jsx-scope': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  }
}
