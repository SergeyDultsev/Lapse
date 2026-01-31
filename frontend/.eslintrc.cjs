module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es2024: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        }
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    plugins: [
        '@typescript-eslint',
        'react',
        'react-hooks',
        'jsx-a11y',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'no-unused-vars': 'off',
        'object-curly-spacing': ['error', 'always'],
        '@typescript-eslint/no-unused-vars': ['warn', {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: false,
        }],

        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never',
        }],

        semi: ['error', 'always'],
        quotes: ['error', 'single'],

        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
    },
};