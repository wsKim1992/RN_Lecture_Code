module.exports = function (api) {
    api.cache(true);
    return {
        plugins: [
            [
                require.resolve("babel-plugin-module-resolver"),
                {
                    extensions: [".js", ".jsx", "json", "svg", "jpg", "png"],
                    alias: {
                        "@components": "./components",
                        "@assets": "./assets",
                        "@constant": "./constant",
                        "@screens": "./screens",
                        "@store": "./store",
                        "@util": "./util",
                    },
                },
            ],
            "react-native-reanimated/plugin",
            "@babel/plugin-proposal-export-namespace-from",
        ],
        presets: ["babel-preset-expo"],
    };
};
