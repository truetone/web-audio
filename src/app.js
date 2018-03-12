const Synth = require("./synth.js");

class App {
  constructor(doc) {
    const modals = doc.getElementsByClassName("modal-layer");
    // move this to a Ui class?
    this.synth = new Synth(modals);
    this.startButton = doc.getElementById("start-button");

    // bind events to our callback function
    this.startButton.onclick = this.synth.eventHandler;
    this.startButton.addEventListener("touchstart", this.synth.eventHandler);
  }
}

module.exports = App
