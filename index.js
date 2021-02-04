const spawn = require('child_process').spawn;
const validateOptions = require('schema-utils');
const schema = require('./schema.json');

class HTMLValidatePlugin {
  constructor(options = {}) {
    // validate options being passed through the plugin
    validateOptions(schema, options, 'HTMLValidatePlugin');

    Object.assign(
      this,
      {
        // default values
        path: 'src/**/*',
        extensions: 'html',
        config: '.htmlvalidate',
        global: false,
      },
      ({
        // destructure params
        path: this.path,
        extensions: this.extensions,
        config: this.config,
        global: this.global,
        // user provided params override defaults
      } = options)
    );
  }

  getExtensions() {
    return this.extensions === 'html' ? this.extensions : this.convertExtensionArrayToRegex();
  }

  getConfig() {
    return '--config ' + this.config + '.json';
  }

  convertExtensionArrayToRegex() {
    // replace array as curly braced string for replacing commas and spaces
    let processedExtension = `"{${this.extensions}}"`.replace(/\"/g, '').replace(/\ /g, '');
    // strip out curly braces if there was only one index provided in extensions array
    return processedExtension.includes(',')
      ? processedExtension
      : processedExtension.replace(/\{/g, '').replace(/\}/g, '');
  }

  runCliBasedOnScope(userParams, spawnParams) {
    /*
      Attempts at better security:
      - schema utils used to validate user input
      - spawn command (by default) is not exec under a shell env
        https://gist.github.com/evilpacket/5a9655c752982faf7c4ec6450c1cbf1b
        https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
    */
    return this.global
      ? spawn('html-validate', [`${userParams}`], spawnParams)
      : spawn('node', ['node_modules/.bin/html-validate', `${userParams}`], spawnParams);
  }

  apply(compiler) {
    // initiate script when webpack compilation is completed
    compiler.hooks.done.tap('HTMLValidatePlugin', () => {
      // set up cli payload
      const userParams = `${this.path}.${this.getExtensions()} ${this.getConfig()}`;
      const spawnParams = { shell: true, stdio: 'inherit' };

      this.runCliBasedOnScope(userParams, spawnParams);
    });
  }
}

module.exports = HTMLValidatePlugin;
