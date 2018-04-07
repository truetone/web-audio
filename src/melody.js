const Notes = require("./notes");
const Context = require("./context");

class Melody {
  constructor(ctxClass, config, melody, interval) {
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
    this.tones.forEach((t) => {
      t.connect();
    });
  }

  disconnect() {
    this.tones.forEach((t) => {
      t.disconnect();
    });
  }
}

module.exports Melody;
