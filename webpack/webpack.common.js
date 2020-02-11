const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],

  entry: './src/server.ts',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        loader: 'ts-loader',
        test: /\.ts$/,
        exclude: [/node_modules/],
        options: {
          configFile: 'tsconfig.json',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
