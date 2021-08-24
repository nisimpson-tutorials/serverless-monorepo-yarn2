const path = require("path");
const os = require("os");
const fs = require("fs");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

/*
This line is only required if you are specifying `TS_NODE_PROJECT` for whatever reason.
 */
// delete process.env.TS_NODE_PROJECT;

const prefix = slsw.lib.serverless.service.service;
const outputPath = fs.mkdtempSync(path.join(os.tmpdir(), prefix));

console.log(`Webpack output path: ${outputPath}`);

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: slsw.lib.entries,
  devtool: slsw.lib.webpack.isLocal
    ? "eval-cheap-module-source-map"
    : "source-map",
  resolve: {
    extensions: [".mjs", ".json", ".ts"],
    symlinks: false,
    cacheWithContext: false,
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.paths.json"
      })
    ]
  },
  output: {
    libraryTarget: "commonjs",
    path: outputPath,
    filename: "[name].js"
  },
  optimization: {
    concatenateModules: false
  },
  target: "node",
  externals: [
    nodeExternals({
      allowlist: ["@monorepo/hello"],
      modulesDir: path.resolve(__dirname, "../../../node_modules")
    })
  ],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: "ts-loader",
        exclude: [
          [
            path.resolve(__dirname, "node_modules"),
            path.resolve(__dirname, ".serverless"),
            path.resolve(__dirname, ".webpack")
          ]
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true
        }
      }
    ]
  },
  plugins: []
};
