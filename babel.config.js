// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       ["module:react-native-dotenv", {
//         "moduleName": "@env",
//         "path": ".env",
//         "blacklist": null,
//         "whitelist": null,
//         "safe": false,
//         "allowUndefined": true
//       }]
//     ]
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@": "./src",
            "@components": "./src/components",
            "@context": "./src/context",
            "@navigation": "./src/navigation",
            "@screens": "./src/screens",
            "@config": "./src/config"
          }
        }
      ]
    ]
  };
};
