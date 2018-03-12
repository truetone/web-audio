const helpers = require("./helpers.js");
const audioContext = require("./audio.js");
const nts = require("./notes.js");

// Synth should only be responsible for putting together the synthy parts
// create a top-level App class to manage it all
class Synth {
  constructor(modals) {
    this.audioContexts = [];
    this.notes = nts.getNotes();
  }

  createContext() {
    return new (window.AudioContext || window.webkitAudioContext)();
  }

  eventHandler() {
  }
}

module.exports = Synth;
