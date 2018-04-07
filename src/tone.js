const gain = require("./gain");
const panner = require("./panner");

class Tone {
  constructor(ctx, name, type, gain_value, panner_value, notes) {
    this.name = name + ".Tone";
    this.gain = new gain(ctx, this.name, gain_value);
    this.panner = new panner(ctx, name, panner_value);
    this.destination = ctx.destination;
    this.oscillator = this.startOscillator(ctx, type);
    // TODO set up Notes class to know what these are
    // this.defaultFrequency = 261.33;
    // this.lowestFrequency = 16.35;
    // this.highestFrequency = 4978.03;
    this.notes = notes;
    this.connected = false;
  }

  connect() {
    this.connected = true;

    // connect the oscillator to the gain node
    this.oscillator.connect(this.gain);

    // connect the gain node to the panner
    this.gain.connect(this.panner);

    // connect the panner to the destination
    this.panner.connect(this.destination);
  }

  disconnect() {
    this.connected = false;
    this.oscillator.disconnect();
  }

  playNote(note) {
    if (typeof note === "undefined") {
      console.warn("Got undefined note")
    } else {
      console.log("Playing ", this.notes[note]);
      this.oscillator.frequency.value = this.notes[note];
    }
  }

  toggle() {
    if (this.connected) {
      this.disconnect();
    } else {
      this.connect();
    }
  }

  startOscillator(ctx, type) {
    const oscillator = ctx.createOscillator();
    oscillator.type = type;
    oscillator.start();
    return oscillator;
  }

}

module.exports = Tone
