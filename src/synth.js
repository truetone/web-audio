const Notes = require("./notes");
const Context = require("./context");
const Chord = require("./chord");

// tones consist of:
// * an audio context
//   * context.destination
// * a gain node
// * a panner node
// * a Tone object
//   * context
//   * type
//   * gain
//   * pan
//   * note(s)
class Synth {
  constructor(ctxClass, configs) {
    this.audioContexts = [];
    this.chords = [];
    this.notes = Notes.getNotes();
    this.ctxClass = ctxClass;

    for (var i = 0; i < configs.length; i++) {
      const config = configs[i];
      const ctx = this.createContext(config.name);
      this.audioContexts.push(ctx);
      this.chords.push(this.createChord(ctx.ctx, config.name, config.type, config.gain, config.pan, config.chordNotes));
    }
  }

  createContext(name) {
    return new Context(this.ctxClass, name);
  }

  createChord(ctx, name, type, gain, pan, chordNotes) {
    return new Chord(ctx, name, type, gain, pan, chordNotes, this.notes);
  }
}

module.exports = Synth;
