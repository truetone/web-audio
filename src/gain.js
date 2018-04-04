class Gain {
  constructor(contextObject, value) {
    console.log("Setting gain value to ", value);
    this.gain = contextObject.createGain();
    this.gain.gain.value = value;
    return this.gain;
  }

  change(value) {
    console.log("Setting gain value to ", value);
    this.gain.gain.value = value;
  }
}

module.exports = Gain;
