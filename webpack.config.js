const HtmlWebpackPlugin = require('html-webpack-plugin'),
	ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');


module.exports = {

	entry: "./src/web/app.js", //relative to root of the application
	output: {
		filename: "./app.bundle.js" //relative to root of the application
	},
	module: {
		rules: [
			{
				test: require.resolve("jquery"),
				use: "imports-loader?this=>window"
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.scss$/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader"
				}, {
					loader: "sass-loader"
				}]
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
			{ test: /\.hbs$/, loader: "handlebars-loader" }
		]
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