class Gain {
  constructor(ctx, name, value) {
    console.log("Setting gain value to ", value);
    this.name = name + ".Gain";
    this.gain = ctx.createGain();
    this.set(value);
    return this.gain;
  }

  set(value) {
    this.gain.gain.value = value;
  }

  change(value) {
    console.log("Setting gain value to ", value);
    this.gain.gain.value = value;
  }
}

module.exports = Gain;
