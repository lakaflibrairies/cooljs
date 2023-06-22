const { requireUncached } = require("../core/bootstrap");
const { random } = require("../core/random");
const { config } = require("../core/config");

global.random = random;
global.config = config;
global.requireUncached = requireUncached;
global.stacks = [];
global.socketStacks = [];
