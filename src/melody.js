const Notes = require("./notes");
const Context = require("./context");
const Synth = require("./synth");

class Melody extends Synth {
  constructor(ctxClass, config, melody, interval) {
    super(ctxClass, config, melody, interval);
    this.melody = melody;
  }

  play() {
    const self = this;
    const interval = this.interval;
    const melody = this.melody;

    if (!this.connected) {
      this.connect();
    }

    this.tones.forEach((tone, idx) => {
      tone.playNote(melody[idx]);
      self.sleep(interval);
    });
    // recurse
    this.play();
  }

  static sleep(ms) {
    const start = new Date().getTime();
    while (new Date().getTime() < start + ms);
  }
}

module.exports = Melody;
