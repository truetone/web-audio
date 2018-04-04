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
  constructor(ctxClass, toneConfigs) {
    this.audioContexts = [];
    this.tones = [];
    this.notes = nts.getNotes();
    this.ctxClass = ctxClass;

    for (var i = 0; i < toneConfigs.length; i++) {
      const ctx = this.createContext();
      const config = toneConfigs[i];
      this.audioContexts.push(ctx);
      this.tones.push(this.createTone(ctx.ctx, config.type, config.gain, config.pan));
    }
  }

  createContext() {
    return new ctx(this.ctxClass, name);
  }

  createTone(ctx, type, gain, pan) {
    return new tone(ctx, type, gain, pan, this.notes);
  }
}

module.exports = Synth;
