const Synth = require("./synth.js");
const Ui = require("./ui.js");

const configs = [
  {
    name: "sine 1",
    type: "sine",
    gain: .1,
    pan: -1,
    chordNotes:[
      "C3",
      "C4",
      "C5",
      "E3",
      "E4",
      "E5",
      "G3",
      "G4",
      "G5"
    ]
  }
];

class App {
  constructor(doc = document) {
    const modals = doc.getElementsByClassName("modal-layer");
    const startButton = doc.getElementById("start-button");
    this.synth = new Synth(window.AudioContext, configs);
    this.ui = new Ui(modals, startButton, this.synth);
  }
}

module.exports = App
