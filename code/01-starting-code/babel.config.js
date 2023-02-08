module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					extensions: ['.js', '.jsx', '.jpg', '.png', '.json'],
					root: './',
					alias: {
						'@screens': './src/screens',
						'@constants': './src/constants',
						'@store': './src/store',
						'@util': './src/util',
						'@components': './src/components',
						'@assets': './src/assets',
						'@query': './src/query',
					},
				},
			],
		],
	};
};
