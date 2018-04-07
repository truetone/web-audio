class Panner {
  constructor(ctx, name, value) {
    this.name = name + ".Panner";
    this.panner = ctx.createPanner();
    this.set(value);
  }

  set(value) {
    this.panner.value = value;
  }

  get() {
    return this.panner.value;
  }
}

module.exports = Panner;
