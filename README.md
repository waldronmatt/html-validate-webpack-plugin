<div align="center">
  <a href="https://www.w3.org/html/logo/downloads/HTML5_1Color_Black.svg"><img width="200" height="200" src="https://www.w3.org/html/logo/downloads/HTML5_1Color_Black.svg"></a>
  <a href="https://webpack.js.org/assets/icon-square-big.svg"><img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg"></a>
</div>

# html-validate-webpack-plugin

> An [html-validate.org](https://html-validate.org/) plugin for webpack

## About plugin

This plugin is a simple wrapper around the [html-validate.org](https://html-validate.org/) cli for automatic validation after each webpack compilation.

## Install

```bash
npm install html-validate-webpack-plugin --save-dev
```

**Note**: Install `html-validate` and create a `.htmlvalidate.json` at the project root with your [configurations](https://html-validate.org/usage/index.html).

```bash
npm install html-validate --save-dev
```

## Usage

In your webpack configuration (development builds):

```js
const HtmlValidatePlugin = require('html-validate-webpack-plugin');

module.exports = {
  // ...
  plugins: [
    // ...
    new HtmlValidatePlugin(),
    // ...
  ],
  // ...
};
```

## Options

You can pass select [html-validate.org](https://html-validate.org/) cli options.

### `path`

- Type: `String`
- Default: `'src/**/*'`

Specifies the directories/files for html-validate to search.

### `extensions`

- Type: `array`
- Default: `['html']`

Specifies the file extensions to use when searching for files in directories.

### `config`

- Type: `String`
- Default: `'.htmlvalidate.json'`

Specify a different configuration file.

**Note:** For your custom configuration omit the `.json` extension and supply the name only.

### `global`

- Type: `boolean`
- Default: `false`

Specify the run context of html-validate.

**Note:** If you installed `html-validate` globally, set the value to `true`.

## Features

- `html-validate` [performs all validation locally](https://html-validate.org/#offline) which means you can use `html-validate` and `html-validate-webpack-plugin` offline.
- `html-validate-webpack-plugin` contains minimal dependencies.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
