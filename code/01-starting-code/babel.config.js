module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					extensions: ['.js', '.jsx', '.jpg', '.png', '.json'],
					alias: {
						'@screens': './screens',
						'@constants': './constants',
						'@store': './store',
						'@util': './util',
						'@components': './components',
						'@assets': './assets',
					},
				},
			],
		],
	};
};
