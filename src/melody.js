const Notes = require("./notes");
const Context = require("./context");

class Melody {
  constructor(ctxClass, config, melody, interval) {
    this.connected = false;
    this.notes = Notes.getNotes();
    this.ctxClass = ctxClass;
    this.melody = melody;
    this.interval = interval;
    this.tones = [];

    const ctx = this.createContext(config.name);
    const self = this;

    melody.forEach(() => {
      this.tones.push(this.createTone(ctx.ctx, this.name, config.type, config.gain, config.pan, self.notes));
    });
  }

  // this is common w/ Synth and could go to a baseSynth class
  createContext(name) {
    return new Context(this.ctxClass, name);
  }

  connect() {
    this.connected = true;
    this.tones.forEach((t) => {
      t.connect();
    });
  }

  disconnect() {
    this.connected = false;
    this.tones.forEach((t) => {
      t.disconnect();
    });
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
