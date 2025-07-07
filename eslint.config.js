import js from "@eslint/js"
import globals from "globals"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
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
    settings: {
      react: {
        version: "detect"
      }
    },
    plugins: {
      "react": react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@stylistic": stylistic,
      "import": eslintImport,
      "newline-destructuring": newlineDestructuring
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
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
          // "ignoreStrings": true,
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
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [
        1,
        {
          "extensions": [
            ".js",
            ".jsx",
            ".ts",
            ".tsx"
          ]
        }
      ],
      "react/jsx-boolean-value": [
        "error",
        "never"
      ],
      "react/jsx-child-element-spacing": [
        "error"
      ],
      "react/jsx-closing-bracket-location": [
        "error",
        {
          "selfClosing": "line-aligned",
          "nonEmpty": "after-props"
        }
      ],
      "react/jsx-closing-tag-location": [
        "error",
        "line-aligned"
      ],
      "react/jsx-curly-brace-presence": [
        "error",
        {
          "props": "never",
          "propElementValues": "always",
          "children": "ignore"
        }
      ],
      "react/jsx-equals-spacing": [
        "error",
        "never"
      ],
      "react/jsx-first-prop-new-line": [
        "error",
        "multiline-multiprop"
      ],
      "react/jsx-max-props-per-line": [
        "error",
        {
          "maximum": {
            "single": 2,
            "multi": 1
          }
        }
      ],
      "react/jsx-no-target-blank": [
        "error",
        {
          "allowReferrer": false,
          "enforceDynamicLinks": "always",
          "warnOnSpreadAttributes": false,
          "links": true,
          "forms": false
        }
      ],
      "react/jsx-one-expression-per-line": [
        "error",
        {
          "allow": "non-jsx"
        }
      ],
      "react/jsx-pascal-case": [
        "error",
        {
          "allowAllCaps": true,
          "allowNamespace": true,
          "allowLeadingUnderscore": false
        }
      ],
      "react/jsx-props-no-multi-spaces": [
        "error"
      ],
      "react/jsx-props-no-spread-multi": [
        "error"
      ],
      "react/jsx-tag-spacing": [
        "error",
        {
          "closingSlash": "never",
          "beforeSelfClosing": "never",
          "afterOpening": "never",
          "beforeClosing": "never"
        }
      ],
      "react/jsx-wrap-multilines": [
        "error",
        {
          "declaration": "parens",
          "assignment": "parens",
          "return": "parens",
          "arrow": "parens",
          "condition": "parens",
          "logical": "parens",
          "prop": "ignore"
        }
      ],
      "react/no-array-index-key": [
        "error"
      ],
      "react/no-object-type-as-default-prop": [
        "error"
      ],
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
				"react/jsx-max-props-per-line": [
					"off"
				]
			}
		}
)
