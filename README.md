<div align="center">
  <a href="https://www.w3.org/html/logo/downloads/HTML5_1Color_Black.svg"><img width="200" height="200" src="https://www.w3.org/html/logo/downloads/HTML5_1Color_Black.svg"></a>
  <a href="https://webpack.js.org/assets/icon-square-big.svg"><img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg"></a>
</div>

# html-validate-webpack-plugin

> An [html-validate.org](https://html-validate.org/) webpack plugin

## About plugin

This plugin is a simple wrapper around the [html-validate.org](https://html-validate.org/) cli.

Validate your html automatically after each webpack compilation; similarly to how you would use eslint and stylelint.

## Install

```bash
npm install html-validate-webpack-plugin --save-dev
```

**Note**: Install `html-validate` if you haven't already.

```bash
npm install html-validate --save-dev
```

**Note**: Create a `.htmlvalidate.json` file with your configurations. [See this page for instructions](https://html-validate.org/usage/index.html).

## Usage

In your webpack configuration (development builds):

```js
const HtmlValidatePlugin = require('html-validate-webpack-plugin');

module.exports = {
  // ...
  plugins: [new HtmlValidatePlugin()],
  // ...
};
```

## Options

You can pass [html-validate.org](https://html-validate.org/) cli options.

### `path`

- Type: `String`
- Default: `src/**/*`

Specifies the directories/files for html-validate to search.

### `extensions`

- Type: `array`
- Default: `['html']`

Specifies the file extensions to use when searching for files in directories.

### `config`

- Type: `String`
- Default: `.htmlvalidate.json`

Specify a different configuration file.

**Note:** For your custom configuration omit the `.json` extension and supply the name only.

### `global`

- Type: `boolean`
- Default: `false`

Specify the run context of html-validate.

**Note:** If you installed html-validate globally, set the value to `true`.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
