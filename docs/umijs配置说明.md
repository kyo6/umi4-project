# Umi.js 4 插件配置说明

Umi 4 的插件加载遵循一个核心原则：**约定优于配置 (Convention over Configuration)**。理解这一原则是正确配置 Umi 项目的关键。

## 两种主要的插件启用方式

Umi 提供了两种启用插件的方式，你需要根据插件的类型选择合适的方式。

### 1. 通过顶级配置项 (Top-level Key)

这是启用 Umi 核心功能插件的首选方式。

- **是什么**：Umi 的许多核心插件（通常内置在 `@umijs/preset-umi` 中）可以通过一个与插件同名的顶级配置项来直接启用和配置。
- **例子**：
  ```javascript
  // config/config.ts
  export default defineConfig({
    // 启用 antd 插件
    antd: {},
    // 启用 layout 插件
    layout: {
      title: 'My App',
    },
    // 启用 initialState 插件
    initialState: {},
    // 启用 tailwindcss 插件
    tailwindcss: {},
  });
  ```
- **规则**：当你使用这种方式时，Umi 会自动为你加载对应的插件。你**绝对不能**再把它写到 `plugins` 数组里。

### 2. 通过 `plugins` 数组

这是用于显式声明和注册非默认插件的方式。

- **是什么**：在 `config.ts` 中的 `plugins` 数组，用于添加 Umi 默认配置之外的插件。
- **使用场景**：
  1.  **使用非内置的官方插件**：比如你想使用 `react-query`，就需要在这里添加 `'@umijs/plugins/dist/react-query'`。
  2.  **使用第三方插件**：你从 npm 安装了某个非官方的 Umi 插件（例如 `umi-plugin-auto-externals`）。
  3.  **使用本地插件**：你在项目中自己开发的插件（例如，放在项目根目录的 `/plugins/my-plugin.ts`）。
- **例子**：
  ```javascript
  // config/config.ts
  export default defineConfig({
    plugins: [
      // 官方非内置插件
      '@umijs/plugins/dist/react-query',
      // 本地插件
      './plugins/my-plugin.ts',
    ],
  });
  ```

---

## 易错点说明：重复注册

**最常见的错误就是重复注册插件**。

当你通过顶级配置项（如 `tailwindcss: {}`）启用了一个插件后，如果同时又在 `plugins` 数组中添加了该插件（如 `'@umijs/plugins/dist/tailwindcss'`），Umi 会尝试加载同一个插件两次，从而导致启动或构建失败。

**错误示例（我们刚刚修复的问题）**：

```javascript
// config/config.ts
export default defineConfig({
  // ...
  tailwindcss: {}, // 方式一：通过顶级配置项启用了 tailwindcss
  plugins: [
    '@umijs/plugins/dist/tailwindcss', // 方式二：又在 plugins 数组中注册
    // ...
  ],
});
```

> **报错信息**：`key tailwindcss is already registered by ..., plugin from ... register failed.`
>
> **原因**：`tailwindcss` 插件被注册了两次。
>
> **正确做法**：删除 `plugins` 数组中的 `'@umijs/plugins/dist/tailwindcss'`，只保留顶级的 `tailwindcss: {}` 配置。

---

## 实践准则

1.  **检查文档**：在使用一个插件前，优先查看它的官方文档。如果文档告诉你通过顶级配置项（如 `antd: {}`）来使用，就用这种方式。
2.  **显式注册**：如果它是一个独立的、非默认集成的插件，或者是一个自定义插件，再把它添加到 `plugins` 数组中。
3.  **坚持二选一**：对于同一个插件，以 �� 两种方式永远是“**二选一**”，绝不能同时使用。

## 引用源

- [UmiJS Official Documentation (umijs.org)](https://umijs.org/)
- [Vercel App - UmiJS Examples](https://vercel.com/)
