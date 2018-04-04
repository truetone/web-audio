class Panner {
  static create (contextObject, value) {
    const panner = contextObject.createPanner();
    panner.value = value;
    return panner
  }
}

module.exports = Panner;
