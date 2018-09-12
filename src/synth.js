const Notes = require("./notes");
const Context = require("./context");
const Chord = require("./chord");

class Synth {
  constructor(ctxClass, configs) {
    this.audioContexts = [];
    this.chords = [];
    this.notes = Notes.getNotes();
    this.ctxClass = ctxClass;

    configs.forEach((config) => {
      const ctx = this.createContext(config.name);
      this.audioContexts.push(ctx);
      this.chords.push(this.createChord(ctx.ctx, config.name, config.type, config.gain, config.pan, config.chordNotes));
    });
  }

  createContext(name) {
    return new Context(this.ctxClass, name);
  }

  createChord(ctx, name, type, gain, pan, chordNotes) {
    return new Chord(ctx, name, type, gain, pan, chordNotes, this.notes);
  }

  start() {
    this.chords.forEach((chord) => {
      chord.connect();
    });
  }

  stop() {
    this.chords.forEach((chord) => {
      chord.disconnect();
    });
  }
}

module.exports = Synth;
