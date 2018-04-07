class Gain {
  constructor(ctx, name, value) {
    this.name = name + ".Gain";
    this.gain = ctx.createGain();
    this.set(value);
  }

  set(value) {
    console.log("Setting gain value to ", value);
    this.gain.gain.value = value;
  }

  get() {
    return this.gain.gain.value;
  }
}

module.exports = Gain;
