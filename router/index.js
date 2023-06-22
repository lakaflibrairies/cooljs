const express = require("express");
const { config } = require("../core/config");
const { Root } = require("../core/root");

function Router(options = undefined) {
  const { stackName = "root" } = options;
  const router = express.Router({ mergeParams: true });
  const routerStack = { stackName, data: [] };

  const builder = {
    get(brick, middlewares, controller, name = undefined) {
      routerStack.data.push({
        verb: "GET",
        pattern: brick,
        action: controller,
        name: !name ? `${routerStack.data.length}` : name,
      });
      router.get(brick, ...middlewares, controller);
      return builder;
    },
    post(brick, middlewares, controller, name = undefined) {
      routerStack.data.push({
        verb: "POST",
        pattern: brick,
        action: controller,
        name: !name ? `${routerStack.data.length}` : name,
      });
      router.post(brick, ...middlewares, controller);
      return builder;
    },
    put(brick, middlewares, controller, name = undefined) {
      routerStack.data.push({
        verb: "PUT",
        pattern: brick,
        action: controller,
        name: !name ? `${routerStack.data.length}` : name,
      });
      router.put(brick, ...middlewares, controller);
      return builder;
    },
    delete(brick, middlewares, controller, name = undefined) {
      routerStack.data.push({
        verb: "DELETE",
        pattern: brick,
        action: controller,
        name: !name ? `${routerStack.data.length}` : name,
      });
      router.delete(brick, ...middlewares, controller);
      return builder;
    },
    resource(
      brick,
      middlewares,
      controller,
      allowedResources,
      name = undefined
    ) {
      const stackLength = routerStack.data.length;
      if (!allowedResources || allowedResources.includes("index")) {
        builder.get(
          brick,
          middlewares,
          controller.index,
          computeName(!name ? stackLength : name, "index")
        );
      }

      if (!allowedResources || allowedResources.includes("create")) {
        builder.get(
          `${brick}/create`,
          middlewares,
          controller.create,
          computeName(!name ? stackLength : name, "create")
        );
      }

      if (!allowedResources || allowedResources.includes("store")) {
        builder.post(
          `${brick}`,
          middlewares,
          controller.store,
          computeName(!name ? stackLength : name, "store")
        );
      }

      if (!allowedResources || allowedResources.includes("show")) {
        builder.get(
          `${brick}/:id`,
          middlewares,
          controller.show,
          computeName(!name ? stackLength : name, "show")
        );
      }

      if (!allowedResources || allowedResources.includes("edit")) {
        builder.get(
          `${brick}/:id/edit`,
          middlewares,
          controller.edit,
          computeName(!name ? stackLength : name, "edit")
        );
      }

      if (!allowedResources || allowedResources.includes("update")) {
        builder.put(
          `${brick}/:id`,
          middlewares,
          controller.update,
          computeName(!name ? stackLength : name, "update")
        );
      }

      if (!allowedResources || allowedResources.includes("destroy")) {
        builder.delete(
          `${brick}/:id`,
          middlewares,
          controller.destroy,
          computeName(!name ? stackLength : name, "destroy")
        );
      }

      return builder;
    },
    group(brick, middlewares, routerGroup, name = undefined) {
      if (typeof routerGroup !== "function") {
        console.error(
          "Bad router group. A router group must be a RouterGroupCallback."
        );
        console.log("Your router group has not been injected...");
        return builder;
      }
      routerGroup(builderFromName(name, brick, middlewares));
      return builder;
    },
    middleware(things, middlewareRouting, name = undefined) {
      middlewareRouting(builderFromName(name, "", things));
      return builder;
    },
    module(brick, middlewares, routingModule) {
      if (!(routingModule instanceof Router)) {
        console.error("routingModule must be a Router object.");
        console.log("Your module has not been injected.");
        return builder;
      }
      router.use(brick, ...middlewares, routingModule.design());
      return builder;
    },
  };

  function design() {
    const nfcp = config("config.notFoundControllerPath");
    const notFoundController = !nfcp
      ? require(nfcp)
      : (req, res) => {
          res.json({ msg: "Not found route !!" });
        };

    router.use("/*", notFoundController);
    stacks.push(routerStack);
    return router;
  }

  function computeName(parentName, childName) {
    if (!parentName && !childName) return;
    if (!parentName) return childName;
    return !childName ? parentName : `${parentName}.${childName}`;
  }

  const builderFromName = (parentName, rootBrick, mid = []) => {
    return {
      get: (brick, middlewares, controller, name) =>
        builder.get(
          rootBrick + brick,
          [...mid, ...middlewares],
          controller,
          computeName(parentName, name)
        ),
      post: (brick, middlewares, controller, name) =>
        builder.post(
          rootBrick + brick,
          [...mid, ...middlewares],
          controller,
          computeName(parentName, name)
        ),
      put: (brick, middlewares, controller, name) =>
        builder.put(
          rootBrick + brick,
          [...mid, ...middlewares],
          controller,
          computeName(parentName, name)
        ),
      delete: (brick, middlewares, controller, name) =>
        builder.delete(
          rootBrick + brick,
          [...mid, ...middlewares],
          controller,
          computeName(parentName, name)
        ),
      resource: (brick, middlewares, controller, allowedResources, name) =>
        builder.resource(
          rootBrick + brick,
          [...mid, ...middlewares],
          controller,
          allowedResources,
          computeName(parentName, name)
        ),
      group: (brick, middlewares, routerGroup, name) =>
        builder.group(
          rootBrick + brick,
          [...mid, ...middlewares],
          routerGroup,
          computeName(parentName, name)
        ),
      middleware: (things, middlewareRouting, name) =>
        builder.middleware(
          [...mid, ...things],
          middlewareRouting,
          computeName(parentName, name)
        ),
      module: builder.module,
    };
  };

  Object.defineProperty(Root.prototype, "get", {
    value: builder.get,
    writable: false,
  });

  Object.defineProperty(Root.prototype, "post", {
    value: builder.post,
    writable: false,
  });

  Object.defineProperty(Root.prototype, "put", {
    value: builder.put,
    writable: false,
  });

  Object.defineProperty(Root.prototype, "delete", {
    value: builder.delete,
    writable: false,
  });

  Object.defineProperty(Root.prototype, "resource", {
    value: builder.resource,
    writable: false,
  });

  Object.defineProperty(Root.prototype, "group", {
    value: builder.group,
    writable: false,
  });

  Object.defineProperty(Root.prototype, "middleware", {
    value: builder.middleware,
    writable: false,
  });

  Object.defineProperty(Root.prototype, "module", {
    value: builder.module,
    writable: false,
  });

  Object.defineProperty(Root.prototype, "design", {
    value: design,
    writable: false,
  });

  return Root;
}

function SocketRouter() {
  const registeredSocketRoutes = [];

  const builder = {
    exportJournal() {
      return registeredSocketRoutes;
    },
    register(name, middlewares, controller) {
      if (name || !controller) {
        registeredSocketRoutes.push({ middlewares });
        return builder;
      }

      const routeExists = registeredSocketRoutes.filter(
        (route) => route.name === name
      )[0];

      if (!routeExists) {
        registeredSocketRoutes.push({ name, middlewares, controller });
      } else {
        console.log(
          `Socket route with name = ${name} already exists in the socket routing journal.`
        );
        console.log(`This route has not been registered.`);
        throw new Error(
          `Socket route with name = ${name} already exists in the socket routing journal. This route has not been registered.`
        );
      }

      return builder;
    },
  };

  Object.defineProperty(Root.prototype, "exportJournal", {
    value: builder.exportJournal,
    writable: false,
  });

  Object.defineProperty(Root.prototype, "register", {
    value: builder.register,
    writable: false,
  });
  return Root;
}

exports.Router = Router;
exports.SocketRouter = SocketRouter;
