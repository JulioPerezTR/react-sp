'use strict';

const { ModuleFederationPlugin } = require('webpack').container;
const build = require('@microsoft/sp-build-web');
const { merge } = require('webpack-merge');

const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const customWebpackConfig = require('./webpack.config.js');

build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

// Approach 1
// Merge custom Webpack configuration
// build.configureWebpack.mergeConfig({
//   additionalConfiguration: (generatedConfiguration) => {
//     return merge(generatedConfiguration, {
//       plugins: [
//         new ModuleFederationPlugin({
//           name: 'SPWebPart',
//           remotes: {
//             ReactAppX: 'ReactAppX@http://localhost:3001/remoteEntry.js',  // Pointing to the remote React app
//           },
//           shared: {
//             react: {singleton: true},
//             'react-dom': {singleton: true},
//           },
//         }),
//       ],
//       resolve: {
//         extensions: ['.ts', '.tsx', '.js', '.jsx'],
//       }
//     });
//   },
// });

// Approach 2
// build.configureWebpack.mergeConfig({
//   additionalConfiguration: (generatedConfiguration) => {
//     console.log('hello webpack gulp')
//     return merge(generatedConfiguration, customWebpackConfig(generatedConfiguration));
//   },
// });

// Approach 3
// Gulp task to bundle JavaScript files using Webpack
gulp.task('bundle', function () {
  return gulp
    .src('src/SpWebPartWebPart.ts') // Entry point of your app
    .pipe(webpackStream(customWebpackConfig, webpack)) // Using webpack-stream with the Webpack config
    .pipe(gulp.dest('dist/')); // Output to the 'dist' folder
});

build.configureWebpack.mergeConfig({
	additionalConfiguration: (generatedConfiguration) => {
		generatedConfiguration.module.rules.push({
			test: /\.(png|woff|woff2|eot|ttf|svg|otf|ts|js|tsx|jsx)$/,
			use: [{ loader: 'url-loader', options: { limit: 500000 } }],
		});

		generatedConfiguration.plugins.push({
			apply: (compiler) => {
				compiler.hooks.done.tap('done', (stats) => {
					if (stats.compilation.errors && stats.compilation.errors.length) {
						console.error('Webpack compilation errors:');
            console.log(stats.compilation.errors);
						stats.compilation.errors.forEach((error) => {
							console.error(`File: ${error.module.resource}`);
							console.error(error.message || error);
						});
						process.exit(1);
					}
				});
			},
		});
		return generatedConfiguration;
	},
});


build.initialize(require('gulp'));
