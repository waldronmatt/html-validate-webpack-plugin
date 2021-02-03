const spawn = require('child_process').spawn;

class HTMLValidatePlugin {
  constructor(options = {}) {
    Object.assign(
      this,
      {
        // default values
        path: 'src/**/*',
        extensions: 'html',
        config: '.htmlvalidate',
        global: false,
      },
      // destructure params
      ({
        path: this.path,
        extensions: this.extensions,
        config: this.config,
        global: this.global,
      } = options)
    );
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
      arguments are in an array and shell option is "false" by default; this is better for security
      https://stackoverflow.com/a/50424976d
      https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
    */
    return this.global
      ? spawn('html-validate', [`${userParams}`], spawnParams)
      : spawn('node', ['node_modules/.bin/html-validate', `${userParams}`], spawnParams);
  }

  apply(compiler) {
    // initiate script when webpack compilation is completed
    compiler.hooks.done.tap('HTMLValidatePlugin', () => {
      const path = `${this.path || 'src/**/*'}`;
      const extension = `${this.convertExtensionArrayToRegex()}`;
      const config = `${'--config ' + this.config + '.json'}`;

      // set up cli payload
      const userParams = `${path}.${extension} ${config}`;
      const spawnParams = {
        shell: true,
        /*inherit color output */ stdio: 'inherit',
      };

      this.runCliBasedOnScope(userParams, spawnParams);
    });
  }
}

module.exports = HTMLValidatePlugin;
