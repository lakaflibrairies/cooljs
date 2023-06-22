import { Root } from "../core/root";

export declare class Server extends Root {
  /** @private @readonly */
  private readonly port: number;

  /** @private @readonly */
  private readonly system: Application;

  /** @private @readonly */
  private readonly host: string;

  /** @private */
  private server: http.Server | https.Server;

  /** @private */
  private statusServer: boolean = false;

  /** @private @readonly */
  private readonly realtime: RealtimeApplication;

  /** @private */
  private socketRouting: SocketRouter<Record<string, any>>;

  /**
   * @class Server
   * @description This class is used to create CoolJS server
   */
  constructor(system: Application, socketRouter: SocketRouter);

  get app(): Application;

  /**
   * @method registerRTAServer
   * @description Used tp register realtime application on the server
   * @private
   */
  private registerRTAServer(): void;

  /**
   * @method start
   * @description Used to start server
   * @param {{ key?: string, cert?: string }} options
   */
  start(options: { key?: string; cert?: string }): void;

  /**
   * @method start
   * @description Used to stop server
   */
  stop(): void;

  /**
   * @method start
   * @description Used to refresh server
   * @param {{ key?: string, cert?: string }} options
   */
  refresh(options: { key?: string; cert?: string }): void;
}
