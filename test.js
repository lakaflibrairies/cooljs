const { init } = require("./core/bootstrap");

init();

console.log("key : ", random.generateKey(32));
console.log("color : ", random.generateColor());

console.log(config("config.corsConfig.toto"));
// stacks
