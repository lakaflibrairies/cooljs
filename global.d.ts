/**
 * @namespace Random
 * @description Contains all method that generate random value
 */
interface Random {
  /**
   * @function generateKey
   * @description Generate the random value that contains characters contained in [a-zA-Z0-9-_+]
   *
   * @param { number } length
   * @description Specify the length of the generated value. If this value is not specified, a random length between 8 and 64 will be used.
   *
   * @returns { string }
   */
  generateKey(length: number): string;

  /**
   * @function generateColor
   * @description Represents a base 16 code as a string equivalent to color formatted to hexadecimal code. The returned value begins by #.
   *
   * @returns { string }
   */
  generateColor(): string;

  /**
   * @function generateInt
   * @description Generate a integer between min and max
   *
   * @param { number } min
   * @default 6
   * @description Specify the minimal value of the generated integer
   *
   * @param { number } max
   * @default 64
   * @description Specify the maximal value of the generated integer
   *
   * @returns { number } Generated value
   */
  generateInt(min: number, max: number): number;
}

declare var random: Random;

/**
 * @function config
 * @description Used to get a specific value in configuration file
 * @use Here is how you can use this function somewhere in your project
 * In your cool.config.json file at the root of your project which can be similar to this code
 * ```js
 * {
 *   for: "bar",
 *   config: {
 *     newFoo: "newBar",
 *     newConfig: {
 *       cool: "js",
 *       version: "1.0.1",
 *       year: 2022
 *     }
 *   }
 * }
 * ```
 *
 * If you want to access to year property of your config, simply call config function like this.
 * ```js
 * config("config.newConfig.year"); // 2022
 * ```
 * @param { string } key Represents the value expected in configuration file
 */
declare function config(key): number | string | boolean;

declare var requireUncached: NodeRequire;

type SocketTools<T> = {
  dispatch?: { (name: string, data: T, callback?: { (data: T): T }): void };
  dispatchTo?: {
    (
      socketId: string,
      name: string,
      data: T,
      callback?: { (data: T): T }
    ): void;
  };
  broadcastDispatching?: {
    (name: string, data: T, callback: { (data: T): T }): void;
  };
};

type SocketControllerAction<T, Socket> = {
  (data: T, socket?: Socket, tools?: SocketTools<T>): void;
};

type ControllerAction = {
  (req: Request, res: Response): void;
};

declare var stacks: {
  stackName: string;
  data: {
    name: string | null;
    pattern: string;
    verb: "GET" | "POST" | "PUT" | "DELETE";
    action: ControllerAction;
  }[];
}[];

declare var socketStacks: {
  stackNam: string;
  data: {
    name: string;
    action: SocketControllerAction<any, any>
  }[]
}
