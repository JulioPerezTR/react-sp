const { ModuleFederationPlugin } = require('webpack').container;
const { merge } = require('webpack-merge');
// const build = require('@microsoft/sp-build-web');

module.exports = (config) => {
    console.log('hello webpack')
    return merge(config, {
        plugins: [
          new ModuleFederationPlugin({
            name: 'SPWebPart',  // Name for WebPart1
            remotes: {
                ReactAppX: 'ReactAppX@http://localhost:3001/remoteEntry.js',  // Pointing to the remote React app
            },
            shared: {
              react: { singleton: true },
              'react-dom': { singleton: true },
            },
          }),
        ],
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.jsx'],  // Ensure correct file extensions
        },
      });
}


// module.exports = build.configureWebpack.mergeConfig({
//     additionalConfiguration: (generatedConfiguration) => {
//       return merge(generatedConfiguration, {
//         plugins: [
//           new ModuleFederationPlugin({
//             name: 'SPWebPart',
//             filename: 'remoteEntry.js',
//             remotes: {
//                 ReactAppX: 'ReactAppX@http://localhost:3001/remoteEntry.js',  // Pointing to the remote React app
//             },
//             shared: {
//               react: {
//                 singleton: true,
//                 requiredVersion: false, // Ensure React version is compatible
//               },
//               'react-dom': {
//                 singleton: true,
//                 requiredVersion: false,
//               },
//             },
//           }),
//         ],
//         resolve: {
//           extensions: ['.ts', '.tsx', '.js', '.jsx'],
//         },
//       });
//     },
//   })
