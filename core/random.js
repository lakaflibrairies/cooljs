/**
 * @private
 * @constant numDico
 * @description Contains decimal digits
 */
const numDico = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * @private
 * @constant hexaDico
 * @description Contains decimal digits and uppercase characters from A to F. The length of this array is 16
 */
const hexaDico = [...numDico, "A", "B", "C", "D", "E", "F"];

/**
 * @private
 * @constant alphaDico
 * @description Contains decimal digits and uppercase characters from A to F. The length of this array is 62
 */
const alphaDico = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

/**
 * @private
 * @constant supportedSpecialCharsDico
 * @description Contains all special characters used to generate random values in the framework
 */
const supportedSpecialCharsDico = [
  "-",
  "+",
  "_",
  ".",
  "=",
  "[",
  "]",
  "/",
  "*",
  "$",
  "#",
  "(",
  ")",
  "@",
];

function generateInt(min = 6, max = 64) {
  if (
    typeof min !== "number" ||
    !Number.isInteger(min) ||
    typeof max !== "number" ||
    !Number.isInteger(max) ||
    max <= min
  ) {
    throw new Error("min and max parameters must be integers.");
  }
  return min + Math.floor(Math.random() * (max - min));
}

function generateKey(length) {
  if (!length) {
    return generateKey(generateInt());
  }
  if (typeof length !== "number" || !Number.isInteger(length) || length <= 0) {
    throw new Error("length must be a positive integer.");
  }
  const dico = [...alphaDico, ...numDico, ...supportedSpecialCharsDico];
  let result = "";
  for (var i = 0; i < length; i++) {
    result += dico[Math.floor(Math.random() * (dico.length - 1))];
  }
  return result;
}

function generateColor() {
  let result = "";
  for (var i = 0; i < 6; i++) {
    result += hexaDico[Math.floor(Math.random() * (hexaDico.length - 1))];
  }
  return "#" + result;
}

exports.random = {
  generateColor,
  generateKey,
  generateInt,
};
