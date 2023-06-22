const { Root } = require("../core/root");
const { config } = require("../core/config");

function Controller() {
  return Root;
}

function ApiController() {
  return Controller;
}

function ViewController() {
  return Controller;
}

function SocketController() {
  return Controller;
}

function ResourceController() {
  return Controller;
}

exports.Controller = Controller;
exports.ApiController = ApiController;
exports.ViewController = ViewController;
exports.SocketController = SocketController;
exports.ResourceController = ResourceController;
