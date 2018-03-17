const helpers = require("./helpers.js");
const audioContext = require("./audio.js");
const nts = require("./notes.js");

class Synth {
  constructor(targetElem) {
    this.audioContexts = [];
    this.notes = nts.getNotes();
  }

  createContext() {
    return new (window.AudioContext || window.webkitAudioContext)();
  }
}

module.exports = Synth;
