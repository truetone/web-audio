class Panner {
  static create (ctx, value) {
    const panner = ctx.createPanner();
    panner.value = value;
    return panner
  }
}

module.exports = Panner;
