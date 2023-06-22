exports.Root = (function () {
  return function () {
    const version = "1.0.1";

    Object.defineProperty(this, "version", { value: version, writable: false });
  };
})();
