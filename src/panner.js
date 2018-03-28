class Panner {
  static create (contextObject, value) {
    const panner = contextObject.ctx.createPanner();
    panner.value = value;
    return panner
  }
}

module.exports = Panner;
