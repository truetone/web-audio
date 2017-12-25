const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js',
    visualizer: './src/visualizer/index.js',
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].js"
  }
};
