module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "@angular-eslint"],
  parserOptions: {
    sourceType: 'module',
    project: ['./tsconfig.json',],
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: false,
  },
  extends: [
    "airbnb-base",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  "overrides": [
    {
      "files": ["*.spec.ts"],
      "rules": {
        "@typescript-eslint/no-floating-promises": "off"
      }
    }
  ],
  rules: {
    "@typescript-eslint/no-unused-vars-experimental": "error",
    'max-len': [
    2,
    {
      code: 175,
      tabWidth: 2,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
    },
    ],
      'import/extensions': ['error', {
        ts: 'never',
        tsx: 'never',
      }],
      'import/prefer-default-export': 'off',
      // The following three rules are just to make schematics less of a pain to use since they generate empty functions/constructors
      'class-methods-use-this': 'off',
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      // Validators.compose from form validation logic violates this but doesnt have 'this' context in its methods.
      // TODO: Try to link to example
      "@typescript-eslint/unbound-method": [
        "error",
        {
          "ignoreStatic": true
        }
      ],
      "@typescript-eslint/array-type": "off",
      "arrow-parens": "off",
      "no-restricted-imports": [
        "error",
        {
          "paths": [
            {
              "name": "rxjs/Rx",
              "message": "Please import directly from 'rxjs' instead"
            }
          ]
        }
      ],
      "@typescript-eslint/interface-name-prefix": "off",
      "max-classes-per-file": "off",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/member-ordering": [
        "error",
        {
          "default": [
            "static-field",
            "instance-field",
            "static-method",
            "instance-method"
          ]
        }
      ],
      "no-multiple-empty-lines": "off",
      "no-restricted-syntax": [
        "error",
        {
          "selector": "CallExpression[callee.object.name=\"console\"][callee.property.name=/^(debug|info|time|timeEnd|trace)$/]",
          "message": "Unexpected property on console object was called"
        }
      ],
      "no-empty": "off",
      "@typescript-eslint/no-inferrable-types": [
        "error",
        { "ignoreParameters": true }
      ],
      "@typescript-eslint/no-non-null-assertion": "error",
      "no-fallthrough": "error",
      "@typescript-eslint/no-var-requires": "off",
      "quote-props": ["error", "as-needed"],
      "sort-keys": "off",
      "quotes": ["error", "single"],
      "comma-dangle": "off",
      "@angular-eslint/component-class-suffix": "error",
      "@angular-eslint/contextual-lifecycle": "error",
      "@angular-eslint/directive-class-suffix": "error",
      "@angular-eslint/no-conflicting-lifecycle": "error",
      "@angular-eslint/no-host-metadata-property": "error",
      "@angular-eslint/no-input-rename": "error",
      "@angular-eslint/no-inputs-metadata-property": "error",
      "@angular-eslint/no-output-native": "error",
      "@angular-eslint/no-output-on-prefix": "error",
      "@angular-eslint/no-output-rename": "error",
      "@angular-eslint/no-outputs-metadata-property": "error",
      "@angular-eslint/use-lifecycle-interface": "warn",
      "@angular-eslint/use-pipe-transform-interface": "error"
    },
  };