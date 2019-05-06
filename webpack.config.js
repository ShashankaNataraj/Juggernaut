const HtmlWebpackPlugin = require('html-webpack-plugin'),
 ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');


module.exports = {

	entry: "./src/web/app.js", //relative to root of the application
	output: {
		filename: "./app.bundle.js" //relative to root of the application
	},
	plugins: [
		new HtmlWebpackPlugin({
			hash: false,
			inlineSource: '.(js|css)$', // embed all javascript and css inline
			filename: './index.html', //relative to root of the application
			template: './src/web/index.html'
		}),
		new ScriptExtHtmlWebpackPlugin({
			inline: 'bundle',
			preload: /\.js$/
		})
	]
};