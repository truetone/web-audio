const helpers = require("./helpers.js");
const audioContext = require("./audio.js");
const nts = require("./notes.js");
const ctx = require("./context.js");

class Synth {
  constructor(ctxClass, number_of_contexts = 6) {
    this.audioContexts = [];
    this.notes = nts.getNotes();
    this.ctxClass = ctxClass;

    for (var i = 0; i < number_of_contexts; i++) {
      this.audioContexts.push(this.createContext());
    }
  }

  createContext() {
    return new ctx(this.ctxClass);
  }
}

module.exports = Synth;
