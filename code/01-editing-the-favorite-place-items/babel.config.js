module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					root: "./src",
					extensions: [".js", ".jsx", ".jpg", ".png", ".json"],
					alias: {
						"@screens": "./screens",
						"@constants": "./constants",
						"@store": "./store",
						"@util": "./util",
						"@components": "./components",
						"@query": "./query",
					},
				},
			],
		],
	};
};
