const Notes = require("./notes");
const Context = require("./context");
const Chord = require("./chord");

/*
 * Synth should be a base class
 *
 * Extend it to ChordSynth for this implementation
 * Create a MelodySynth implementation that plays single notes are a defined interval
 */
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
}

module.exports = Synth;
