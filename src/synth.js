const audioContext = require("./audio");
const nts = require("./notes");
const ctx = require("./context");
const tone = require("./tone");

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
    this.tones = [];
    this.notes = nts.getNotes();
    this.ctxClass = ctxClass;

    for (var i = 0; i < configs.length; i++) {
      const config = configs[i];
      const ctx = this.createContext(config.contextName);
      this.audioContexts.push(ctx);
      this.tones.push(this.createTone(ctx.ctx, config.type, config.gain, config.pan));
    }
  }

  createContext(name) {
    return new ctx(this.ctxClass, name);
  }

  createTone(ctx, type, gain, pan) {
    return new tone(ctx, type, gain, pan, this.notes);
  }
}

module.exports = Synth;
