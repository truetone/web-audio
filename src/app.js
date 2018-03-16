const Synth = require("./synth.js");
const Ui = require("./ui.js");

class App {
  constructor(doc = document, startSynthEvent = new Event("startsynth", {bubbles: true})) {
    const modals = doc.getElementsByClassName("modal-layer");
    const startButton = doc.getElementById("start-button");
    this.ui = new Ui(modals, startButton, startSynthEvent);
    this.synth = new Synth();
  }
}

module.exports = App
