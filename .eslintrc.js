module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends:["plugin:react/recommended"],

    plugins: ["react"],
    parserOptions: {
        ecmaVersion: "2018",
        sourceType: 'module', 
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-unused-vars": 2
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
}