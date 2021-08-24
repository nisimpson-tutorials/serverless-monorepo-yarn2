import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: 'hello-api',
  frameworkVersion: '2',
  package: {
    individually: true
  },
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      packager: 'yarn2',
      keepOutputDirectory: true,
      includeModules: {
        nodeModulesRelativeDir: '../../..'
      },
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { hello },
};

module.exports = serverlessConfiguration;
