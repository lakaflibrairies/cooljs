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
export declare function config(key: string): number | string | boolean;