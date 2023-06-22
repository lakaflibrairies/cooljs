const { serverConfig, defaultConfig } = require("../config/cool.config");

function config(key) {
  if (typeof key !== "string" || key.length === 0) {
    throw new Error("parameter key must be a not empty string.");
  }

  try {
    return key.split(".").reduce((acc, curr, currentIndex) => {
      if (currentIndex === 0) {
        return serverConfig[curr] || defaultConfig[curr];
      }
      return acc[curr];
    }, null);
  } catch (error) {
    throw new Error(
      "Can not read property " + key + " in configuration project."
    );
  }
}

exports.config = config;
