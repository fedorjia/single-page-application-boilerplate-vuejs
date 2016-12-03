module.exports = {
    root: true,
    parser: 'babel-eslint',
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        "no-console": 0,
        "no-unused-vars": 0
    },

    "globals": {
        "$": true,
        "process": true,
        "__dirname": true,
        "rm": true,
        "mkdir": true,
        "cp": true
    }
};
