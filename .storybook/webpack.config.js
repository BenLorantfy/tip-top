const webpack = require('webpack');
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);
  // config.plugins.push(new webpack.IgnorePlugin(/.+/, /tests$/));
  config.module.rules = [{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  }]
  return config;
};
