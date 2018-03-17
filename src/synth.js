const helpers = require("./helpers.js");
const audioContext = require("./audio.js");
const nts = require("./notes.js");

class Synth {
  constructor(targetElem) {
    this.audioContexts = [];
    this.notes = nts.getNotes();
    targetElem.addEventListener("startsynth", this.eventHandler);
    this.targetElem = targetElem;
  }

  createContext() {
    return new (window.AudioContext || window.webkitAudioContext)();
  }

  eventHandler(event) {
  }
}

module.exports = Synth;
