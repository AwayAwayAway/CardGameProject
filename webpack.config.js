const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	plugins: [new MiniCssExtractPlugin({
		filename: '[name].css',
	})],
	entry: {
		main: './js/game.js',
		spa: './js/SPAcontroller.js',
		mainMenu: './js/main_menu.js',
		chooseMenu: './js/choose_menu.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {loader: 'babel-loader'}
			},
			{
				test: /\.(s[ac]|c)ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
					loader: 'css-loader',
					options: { url: false }
				}, 'sass-loader', 'postcss-loader']
			}
		]
	},
	devServer: {
		overlay: true
	},
	devtool: 'source-map'
};
