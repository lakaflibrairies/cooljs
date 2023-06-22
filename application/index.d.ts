import http from "http";
import https from "https";
import { Express } from "express";
import { Server, ServerOptions, Socket } from "socket.io";
import { Root, SocketRoutingObject, Socket, SocketServerMiddlewareAction, SocketEventMiddlewareAction } from "../core/root";
import { Router, SocketRouter } from "../router";

export declare class Application extends Root {
  /** @private @readonly */
  private readonly application: Express;

  constructor();

  get app(): Express;

  /**
   * @private
   */
  private initApplication(): void;

  /**
   * @private
   */
  private injectCorsSecurity();

  /**
   * @private
   */
  private setXPoweredHeader(): void;

  /**
   * @private
   */
  private setStaticStorage(): void;

  /**
   * @private
   */
  private setCustomStorage(): void;

  /**
   * @private
   */
  private setViews(): void;

  /**
   * @private
   */
  private setSessions(): void;

  /**
   * @param { string } id
   * @param { Router } router
   */
  injectRouting(id: string, router: Router): void;
}

export declare class RealtimeApplication extends Root {
  private readonly sio: Server;
  private socket: Socket;
  private allowedEvents: string[];
  private beforeConnection: SocketRoutingObject<Record<string, any>>[];
  private insideConnection: SocketRoutingObject<Record<string, any>>[];

  constructor(
    app: http.Server | https.Server,
    socketRouting?: SocketRouter<Record<string, any>>,
    options?: ServerOptions
  );

  /** @private */
  private connection(socket: Socket): void;
  
  /** @private */
  private disconnection(socket: Socket): void;

  /** @private */
  private listenBeforeConnection(): void;

  /** @private */
  private listenInsideConnection(): void;

  listen<T>(
    name: string,
    middlewares: Array<
      SocketServerMiddlewareAction | SocketEventMiddlewareAction<T>
    >,
    callback: {
      (data: T, socket?: Socket, tools?: SocketTools<T>): void;
    }
  ): void;

  dispatch<T>(name: string, data: T, callback?: { (data: T): void }): void;

  dispatchTo<T>(
    socketId: string,
    name: string,
    data: T,
    callback?: { (data: T): T }
  ): void;

  broadcastDispatching<T>(
    name: string,
    data: T,
    callback: { (data: T): T }
  ): void;

  /** @private */
  private injectSocketRouting(
    socketRouting: SocketRouter<Record<string, any>>
  ): void;
}
