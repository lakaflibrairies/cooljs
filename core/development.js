const { config } = require("../core/config");

const isDev = config("mode") === "development";

const devConsole = {};

function noAction() {}

function log(...values) {
  if (isDev) {
    return console.log(...values);
  }
  noAction();
}

function info(...values) {
  if (isDev) {
    return console.info(...values);
  }
  noAction();
}

function error(...values) {
  if (isDev) {
    return console.error(...values);
  }
  noAction();
}

function table(...values) {
  if (isDev) {
    return console.table(...values);
  }
  noAction();
}

function time(label, cb) {
  if (!isDev || typeof cb !== "function") {
    noAction();
  }
  console.time(label);
  cb();
  console.timeEnd(label);
}

Object.defineProperties(devConsole, {
  log: { value: log, writable: false },
  info: { value: info, writable: false },
  error: { value: error, writable: false },
  table: { value: table, writable: false },
  time: { value: time, writable: false },
});

exports.devConsole = devConsole;
