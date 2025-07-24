import js from "@eslint/js"
import globals from "globals"
import stylistic from "@stylistic/eslint-plugin"
import eslintImport from "eslint-plugin-import"
import newlineDestructuring from "eslint-plugin-newline-destructuring"
import tseslint from "typescript-eslint"

export default tseslint.config(
  {
    ignores: [
      "dist",
      "*.config.*"
    ]
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended
    ],
    files: [ "**/*.{ts,tsx}" ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {},
    plugins: {
      "@stylistic": stylistic,
      "import": eslintImport,
      "newline-destructuring": newlineDestructuring
    },
    rules: {
      "no-multiple-empty-lines": [
        "error",
        {
          "max": 1,
          "maxBOF":0,
          "maxEOF": 1
        }
      ],
      "indent": [
        "error",
        "tab",
        {
          "SwitchCase": 1
        }
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      "max-len": [
        "warn",
        {
          "code": 90,
          "tabWidth": 2,
          "ignoreComments": true,
          "ignoreTemplateLiterals": true
        }
      ],
      "quotes": [
        "error",
        "double",
        {
          "allowTemplateLiterals": true
        }
      ],
      "jsx-quotes": [
        "error",
        "prefer-double"
      ],
      "semi": [
        "error",
        "never"
      ],
      "eol-last": [
        "error",
        "always"
      ],
      "array-bracket-spacing": [
        "error",
        "always",
        {
          "objectsInArrays": false,
          "arraysInArrays": false
        }
      ],
      "multiline-ternary": [
        "error",
        "always-multiline"
      ],
      "no-multi-spaces": "error",
      "prefer-destructuring": [
        "warn"
      ],
      "newline-destructuring/newline": [
        "error",
        {
          "items": 3,
          "itemsWithRest": 3,
          "consistent": true
        }
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@stylistic/comma-dangle": [
        "error",
        "never"
      ],
      "@stylistic/comma-spacing": [
        "error",
        {
          "before": false,
          "after": true
        }
      ],
      "@stylistic/computed-property-spacing": [
        "error",
        "always"
      ],
      "@stylistic/dot-location": [
        "error",
        "property"
      ],
      "@stylistic/function-call-spacing": [
        "error",
        "never"
      ],
      "@stylistic/implicit-arrow-linebreak": [
        "error",
        "beside"
      ],
      "@stylistic/key-spacing": [
        "error",
        {
          "beforeColon": false,
          "afterColon": true
        }
      ],
      "@stylistic/keyword-spacing": [
        "error",
        {
          "before": true,
          "after": true
        }
      ],
      "@stylistic/newline-per-chained-call": [
        "error",
        {
          "ignoreChainWithDepth": 2
        }
      ],
      "@stylistic/no-floating-decimal": "error",
      "@stylistic/no-mixed-operators": "error",
      "@stylistic/no-mixed-spaces-and-tabs": "error",
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-whitespace-before-property": "error",
      "@stylistic/nonblock-statement-body-position": [
        "error",
        "beside"
      ],
      "@stylistic/object-curly-newline": [
        "error",
        {
          "ObjectExpression": {
            "multiline": true,
            "minProperties": 4
          },
          "ObjectPattern": {
            "multiline": true,
            "minProperties": 4
          },
          "ExportDeclaration": {
            "multiline": false,
            "minProperties": 3
          }
        }
      ],
      "@stylistic/object-curly-spacing": [
        "error",
        "always"
      ],
      "@stylistic/object-property-newline": [
        "error",
        {
          "allowAllPropertiesOnSameLine": false
        }
      ],
      "@stylistic/one-var-declaration-per-line": [
        "error",
        "always"
      ],
      "@stylistic/operator-linebreak": "off",
      "@stylistic/rest-spread-spacing": [
        "error",
        "never"
      ],
      "@stylistic/semi-spacing": "error",
      "@stylistic/space-before-blocks": "error",
      "@stylistic/space-before-function-paren": [
        "error",
        {
          "anonymous": "never",
          "named": "never",
          "asyncArrow": "always"
        }
      ],
      "@stylistic/space-in-parens": [
        "error",
        "never"
      ],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/space-unary-ops": "error",
      "@stylistic/switch-colon-spacing": "error",
      "@stylistic/template-curly-spacing": "error",
      "@stylistic/template-tag-spacing": "error",
      "@stylistic/type-annotation-spacing": "error",
      "@stylistic/type-generic-spacing": "error",
      "@stylistic/arrow-spacing": [
        "error",
        {
          "before": true,
          "after": true
        }
      ],
      "import/order": [
        "error",
        {
          "groups": [
            [ "builtin", "external" ],
            "type",
            [ "index", "sibling", "parent" ]
          ],
          "pathGroups": [
            {
              "pattern": "@/{styles,components}/**",
              "patternOptions": { "partial": true },
              "group": "type",
              "position": "after"
            },
            {
              "pattern": "@/!(components|styles)/**",
              "patternOptions": { "partial": true },
              "group": "type"
            }
          ],
          "pathGroupsExcludedImportTypes": [ "builtin", "external", "type" ],
          "newlines-between": "always"
        }
      ]
    }
  },
  {
			"files": [ "./src/components/Icons/**/*.tsx" ],
			"rules": {
				"max-len": [
					"warn",
					{
						"code": 90,
						"tabWidth": 2,
						"ignoreStrings": true,
						"ignoreComments": true,
						"ignoreTemplateLiterals": true
					}
				],
			}
		}
)
