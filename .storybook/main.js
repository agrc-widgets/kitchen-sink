const path = require('path');

module.exports = {
  stories: ['../packages/**/*.stories.js'],
  addons: [{
    name: '@storybook/addon-essentials',
    options: {
      backgrounds: false,
    }
  }],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    });

    return config;
  }
}
