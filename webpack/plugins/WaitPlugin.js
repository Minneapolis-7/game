// https://www.viget.com/articles/run-multiple-webpack-configs-sequentially/
// eslint-disable-next-line import/no-extraneous-dependencies
const WebpackBeforeBuildPlugin = require('before-build-webpack');

const fs = require('fs');

class WaitPlugin extends WebpackBeforeBuildPlugin {
  constructor(file, interval = 100) {
    super((stats, callback) => {
      function poll() {
        if (fs.existsSync(file)) {
          callback();
        } else {
          setTimeout(poll, interval);
        }
      }

      poll();
    });
  }
}

module.exports = WaitPlugin;
