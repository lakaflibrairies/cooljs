const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const { config } = require("../core/config");
const { Root } = require("../core/root");
const { Router, SocketRouter } = require("../router");

function Application() {
  const options = config("config");
  const application = express();

  function initApplication() {
    application.use(express.json());
    application.use(express.urlencoded({ extended: true }));
  }

  function injectCorsSecurity() {
    application.use((req, res, next) => {
      if (Object.keys(options.corsConfig).length > 0) {
        for (const key in options.corsConfig) {
          if (Object.hasOwnProperty.call(options.corsConfig, key)) {
            res.setHeader(key, options.corsConfig[key]);
          }
        }
      }
      next();
    });
  }

  function setXPoweredBy(by) {
    application.use((req, res, next) => {
      res.set({ "X-Powered-By": by });
      next();
    });
  }

  function setStaticStorage() {
    const storagePath = options.storagePath;
    const storeFolders = options.storeFolders;

    for (let key in storeFolders) {
      this.application.use(
        `/${key}`,
        express.static(`${storagePath}/${storeFolders[key]}`)
      );
    }
  }

  function setCustomStorage() {
    const storageConfig = config("storageConfig");
    for (let key in storageConfig) {
      if (
        storageConfig[key].middleware &&
        storageConfig[key].middleware.length !== 0
      ) {
        application.use(
          key,
          ...storageConfig[key].middleware,
          express.static(storageConfig[key].folder)
        );
      } else {
        application.use(key, express.static(storageConfig[key].folder));
      }
    }
  }

  function setViews() {
    const { engine, folder } = options.viewConfig;

    application.set("views", folder);
    application.set("view-engine", "ejs");
    application.use(expressLayouts);
    application.set("layout", "../public/index.ejs");
  }

  function setSessions() {
    application.use(session(config("config.session")));
  }

  function injectRouting(id, routing) {
    if (!(routing instanceof Router)) {
      throw new Error(
        "Can not inject router. Routing must be a CoolJS Router object."
      );
    }
    if (config("maintenance") === "disabled") {
      application.use(id, routing.design());
    } else {
      application.use("/*", (req, res) => {
        res.send("Maintenance Mode enabled !");
      });
    }
  }

  function app() {
    return application;
  }

  initApplication();
  injectCorsSecurity();
  // setXPoweredBy("LaKaf-CoolJS");
  setXPoweredBy("Django 3.2");
  setSessions();

  if (config("maintenance") === "disabled") {
    setStaticStorage();
    setViews();
    setCustomStorage();
  }

  Object.defineProperty(Root.prototype, "app", {
    value: app,
    writable: false,
  });

  Object.defineProperty(Root.prototype, "injectRouting", {
    value: injectRouting,
    writable: false,
  });

  return Root;
}

function RealtimeApplication(
  app,
  socketRouting = undefined,
  options = undefined
) {
  const sio = require("socket.io")(app, options);
  var socket = null;
  const allowedEvents = [];
  const beforeConnection = [];
  const insideConnection = [];

  function connection(s) {
    socket = s;

    socket.on("disconnect", () => {
      disconnect(socket);
    });

    listenInsideConnection();
  }

  function disconnect(s) {
    console.log("Socket disconnected");
  }

  function listenBeforeConnection() {
    if (beforeConnection.length === 0) return;

    beforeConnection.forEach((item) => {
      item.middlewares.forEach((middleware) => {
        if (middleware.type === "on-server") {
          sio.use(middleware.action);
        }
      });
    });
  }

  function listenInsideConnection() {
    if (insideConnection.length === 0) return;

    insideConnection.forEach((item) => {
      const middlewareForAction = item.middlewares
        .filter((m) => m.type === "in-socket-action")
        .map((m) => m.action);
      listen(item.name, middlewareForAction, item.controller);
    });
  }

  function listen(name, middlewares, callback) {
    socket.on(name, (data) => {
      var isValid = true;
      for (let i = 0; isValid && i < middlewares.length; i++) {
        isValid = middlewares[i](data) || false;
      }
      if (!isValid) {
        dispatchTo(socket.id, "error:not-authorized", {
          error: new Error("Not authorized."),
        });
        return;
      }
      callback(data, socket, {
        dispatch: dispatch,
        dispatchTo: dispatchTo,
        broadcastDispatching: broadcastDispatching,
      });
    });
  }

  function dispatch(name, data, callback = undefined) {
    socket.emit(
      name,
      !callback
        ? data
        : (function () {
            callback(data);
            return data;
          })()
    );
  }

  function dispatchTo(socketId, name, data, callback) {
    socket.to(socketId).emit(
      name,
      !callback
        ? data
        : (function () {
            callback(data);
            return data;
          })()
    );
  }

  function broadcastDispatching(name, data, callback) {
    socket.broadcast.emit(name, callback(data));
  }

  function injectSocketRouting(socketRouting) {
    socketRouting.exportJournal().forEach((route) => {
      if (!route.name || !route.controller) {
        beforeConnection.push(route);
      } else {
        insideConnection.push(route);
      }
    });
  }

  if (socketRouting instanceof SocketRouter) {
    injectSocketRouting(socketRouting);
  } else {
    console.log("No socket router provided.");
  }

  listenBeforeConnection();

  sio.on("connection", connection);

  console.log("Realtime mode has been started...");

  Object.defineProperty(Root.prototype, "listen", {
    value: listen,
    writable: false,
  });

  Object.defineProperty(Root.prototype, "dispatch", {
    value: dispatch,
    writable: false,
  });

  Object.defineProperty(Root.prototype, "dispatchTo", {
    value: dispatchTo,
    writable: false,
  });

  Object.defineProperty(Root.prototype, "broadcastDispatching", {
    value: broadcastDispatching,
    writable: false,
  });

  return Root;
}

exports.Application = Application;
exports.RealtimeApplication = RealtimeApplication;
