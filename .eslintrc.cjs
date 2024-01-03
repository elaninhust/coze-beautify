module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  // 解决 Warning: React version not specified in eslint-plugin-react settings
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended', // 检测 React 相关的语法和最佳实践
    'plugin:react-hooks/recommended', // 检测 Hooks 的使用是否符合最佳实践
    /**
     * 整合 eslint-config-prettier 和 eslint-plugin-prettier ，且确保这一行是数组的最后一个元素
     * 1. eslint-config-prettier: 禁用掉了一些不必要的以及和 Prettier 相冲突的 ESLint 规则
     * 2. eslint-plugin-prettier: 将 prettier 作为 ESLint 的规则来使用，相当于代码不符合 Prettier 的标准时，会报一个 ESLint 错误，同时也可以通过 eslint --fix 来进行格式化
     * 参考：https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
     */
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off', // 关闭老版本的 React 必须引入 React 的校验
  },
};
