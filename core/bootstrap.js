exports.init = function () {
  require("../global/global");
};

exports.requireUncached = function (mod) {
  delete require.cache[require.resolve(mod)];
  return require(mod);
};
