module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			[
				"module-resolver",
				{
					root: "./",
					extensions: [".js", ".jsx", ".jpg", ".png", ".json"],
					alias: {
						"@screens": "./src/screens",
						"@constants": "./src/constants",
						"@store": "./src/store",
						"@util": "./src/util",
						"@components": "./src/components",
						"@query": "./src/query",
					},
				},
			],
		],
	};
};
