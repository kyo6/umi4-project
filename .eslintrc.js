module.exports = {
  extends: require.resolve('umi/eslint'),
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'no-unused-vars': 1,
    '@typescript-eslint/no-unused-vars': 1,
    'react/button-has-type': 1,
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        "functions": false, // 允许函数提升
        "classes": false,   // 允许类提升
        "variables": true,  // 禁止变量提升
        "enums": false      // 允许枚举提升
      }
    ]
  },
};
