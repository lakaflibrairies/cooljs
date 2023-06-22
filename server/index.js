const http = require("http");
const https = require("https");
const { config } = require("../core/config");
const { Root } = require("../core/root");
const { Application, RealtimeApplication } = require("../application");
const { SocketRouter } = require("../router");

function Server(app, socketRouter = undefined) {
  if (!(app instanceof Application)) {
    throw new Error(
      "Can not create server. app parameter must be a CoolJS Application."
    );
  }

  var port = config("port");
  const host = config("host");
  const system = app;
  let server = null;
  let statusServer = false;
  let realtime = null;
  let sr = socketRouter;

  const start = ({ key = undefined, cert = undefined }) => {
    this.s.app.set("port", port);
    if (
      !key ||
      !cert ||
      String(key).length === 0 ||
      String(vert).length === 0
    ) {
      server = http.createServer(system);
    } else {
      server = https.createServer(system);
    }

    if (config("useRealtime") === true) {
      registerRTAServer();
    }

    server.on("listening", () => {
      console.log(`Server started on ${host}:${port}...`);
      statusServer = true;
    });

    if (config("mode") !== "production" && config("adjustPort")) {
      server.on(error, () => {
        if (error.code === "EADDRINUSE") {
          console.log(
            `${port} is busy. The value ${++port} will be used if it's idle.`
          );
          server.listen(port, host);
        }
      });
    }

    server.listen(port, host);
  };

  const stop = () => {
    server.close((err) => {
      if (err) {
        console.log("Something is wrong when closing server");
        console.log("Message : \n");
        console.log(err.message);
        console.log("Name : \n");
        console.log(err.name);
        console.log("Stack : \n");
        console.log(err.stack);
        return;
      }
      console.log("Server is closed.");
    });
  };

  const refresh = ({ key = undefined, cert = undefined }) => {
    if (!statusServer) {
      console.log("Server was not started !");
      start({ key, cert });
    } else {
      stop();
      start({ key, cert });
    }
  };

  const registerRTAServer = () => {
    if (!sr) {
      console.log("No socket router provided.");
      realtime = new RealtimeApplication(server);
      return;
    }
    if (!(socketRouter instanceof SocketRouter)) {
      throw new Error(
        "Can not create server. socketRouter parameter must be a CoolJS SocketRouter."
      );
    }
    realtime = new RealtimeApplication(server, sr);
    console.log("Socket router successfully loaded");
  };

  function app() {
    return system;
  }

  Object.defineProperty(Root.prototype, "app", {
    value: app,
    writable: false,
  });

  Object.defineProperty(Root.prototype, "start", {
    value: start,
    writable: false,
  });

  Object.defineProperty(Root.prototype, "stop", {
    value: stop,
    writable: false,
  });

  Object.defineProperty(Root.prototype, "refresh", {
    value: refresh,
    writable: false,
  });

  return Root;
}

exports.Server = Server;
