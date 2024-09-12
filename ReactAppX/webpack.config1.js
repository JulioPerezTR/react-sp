const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'ReactAppX',
      filename: 'remoteEntry.js',
      exposes: {
        "./Header": "./src/Header.jsx",
        "./Footer": "./src/Footer.jsx"
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
