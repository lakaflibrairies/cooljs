import { ResourceControllerInterface } from "../core/root";

export declare class Controller {}

export declare class ApiController extends Controller {}

export declare class ViewController extends Controller {}

export declare class SocketController extends Controller {}

export declare class ResourceController
  extends Controller
  implements ResourceControllerInterface {}
