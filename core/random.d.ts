/**
 * @namespace random
 * @description Contains all method that generate random value
 */
export declare namespace random {
  /**
   * @function generateKey 
   * @description Generate the random value that contains characters contained in [a-zA-Z0-9-_+]
   * 
   * @param { number } length
   * @description Specify the length of the generated value. If this value is not specified, a random length between 8 and 64 will be used.
   *
   * @returns { string }
   */
  function generateKey(length: number): string;

  /**
   * @function generateColor
   * @description Represents a base 16 code as a string equivalent to color formatted to hexadecimal code. The returned value begins by #.
   * 
   * @returns { string } 
   */
  function generateColor(): string;

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
  function generateInt(min: number, max: number): number;
}
