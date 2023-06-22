import { Router } from "express";
import {
  ControllerAction,
  MiddlewareAction,
  ResourceArray,
  ResourceControllerInterface,
  Root,
  RouterGroupCallback,
  RouterMiddlewareCallback,
  RouterStack,
  SocketMiddlewareType,
  SocketRoutingObject,
} from "../core/root";

/**
 *  ** To create a routing object, just declare a variable or constant which contains an instance of Router like this
 *
 *  ```js
 *  const routing: Router = new Router();
 *  ```
 *
 *  ** Router object allow to chain route registration like this :
 *
 *  ```js
 *    routing
 *      .get(...)
 *      .post(...)
 *      .resource(...)
 *      .delete(...)
 *      .middleware(...);
 *  ```
 *
 *  ** To create a resource route, process like this
 *
 *  ```js
 *  routing.resource("/users", [], resourceController);
 *  ```
 *
 *  First parameter is a base path that will used to make request.
 *
 *  Second parameter is an array of middlewares which will be used before threat request.
 *
 *  Third parameter is a controller which contains all resource methods that will be called when request made.
 *
 *
 *  resource route provides these routes :
 *
 *  ```js
 *  - /users              //  (GET)       // -> index route,
 *  - /users/create       //  (GET)       // -> create route,
 *  - /users/             //  (POST)      // -> store route,
 *  - /users/:id          //  (GET)       // -> show route,
 *  - /users/:id/edit     //  (GET)       // -> edit route,
 *  - /users/:id          //  (PUT)       // -> update route,
 *  - /users/:id          //  (DELETE)    // -> destroy route
 *  ```
 *
 *
 *  ** To create a grouped routes, you can do like this
 *
 *  ```js
 *  routing.group("/auth", (router) => {
 *    router
 *      .get("/signup", [], (req, res) => {
 *        res.json({ msg: "Sign up works !" });
 *      })
 *      .get("/login", [], (req, res) => {
 *        res.json({ msg: "Login works !" });
 *      })
 *      .get("/logout", [], (req, res) => {
 *        res.json({ msg: "Logout works !" });
 *      });
 *  });
 *  ```
 *
 *    Or
 *
 *  ```js
 *  routing.group("/auth", (router) => {
 *    router
 *      .get("/signup", [], controller.action1)
 *      .get("/login", [], controller.action2)
 *      .get("/logout", [], controller.action3);
 *  });
 *  ```
 *
 *
 *  ** To create a middleware routes, do like this :
 *
 *  ```js
 *  routing
 *    .middleware(middlewares: MiddlewareAction[], (router) => {
 *      router.get("/buy", [], controller.action1);
 *      router.get("/list", [], controller.action2);
 *      router.post("/comment", [], controller.action3);
 *    });
 *  ```
 *
 *
 *  ** To inject module in your routing, do like this :
 *
 *  ```js
 *  routing.module("/shop", new_routing);
 *  ```
 *
 *
 *  NB: using controller means that you instantiated it long before...
 *
 */

export declare class Router extends Root {
  private readonly router: Router;
  private routerStack: RouterStack;

  constructor(options?: { stackName?: string });

  get(
    brick: string,
    middlewares: Array<MiddlewareAction>,
    controller: ControllerAction
  ): Router;

  post(
    brick: string,
    middlewares: Array<MiddlewareAction>,
    controller: ControllerAction
  ): Router;

  put(
    brick: string,
    middlewares: Array<MiddlewareAction>,
    controller: ControllerAction
  ): Router;

  delete(
    brick: string,
    middlewares: Array<MiddlewareAction>,
    controller: ControllerAction
  ): Router;

  resource(
    brick: string,
    middlewares: MiddlewareAction[],
    controller: ResourceControllerInterface,
    allowedResources?: ResourceArray
  ): Router;

  group(brick: string, routerGroup: RouterGroupCallback): Router;

  middleware(
    things: MiddlewareAction[],
    middlewareRouting: RouterMiddlewareCallback
  ): Router;

  module(
    brick: string,
    middlewares: MiddlewareAction[],
    routingModule: Router
  ): Router;

  design(): Router;
}

export declare class SocketRouter extends Root {
  private registeredSocketRoutes: SocketRoutingObject<any>[];

  exportJournal(): SocketRoutingObject<any>[];

  register(
    name: string,
    middleware: SocketMiddlewareType<any>[],
    controller: SocketController<any>
  );
}
