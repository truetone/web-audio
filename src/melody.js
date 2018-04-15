const Notes = require("./notes");
const Context = require("./context");
const Synth = require("./synth");

class Melody extends Synth {
  constructor(ctxClass, configs, interval) {
    super(ctxClass, configs);
    this.interval = interval;
    this.tones = this.getTones();
    this.stopped = false;
  }

  * play() {
    this.playTones();
    yield;

    // recurse
    if (!this.stopped) {
      this.play();
    }
  }

  * playTones() {
    const interval = this.interval;
    let idx = 0;

    for (let tone of this.tones) {
      if (this.stopped) {
        break;
      }
      tone.playNote(this.tones[idx]);
      yield;
      idx += 1;
      this.sleep(interval);
    };
    yield;
  }

  stop() {
    this.stopped = true;
  }

  sleep(ms) {
    const start = new Date().getTime();
    while (new Date().getTime() < start + ms);
  }

  getTones() {
    const tones = [];

    this.chords.forEach((chord, idx) => {
      chord.tones.forEach((tone) => {
        tones.push(tone);
      });
    });

    return tones;
  }
}

module.exports = Melody;
