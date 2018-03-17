class Ui {
  constructor(modals, startButton, synth) {
    // attach the synth to the target element because "this" loses it's context
    // in the eventHandler
    startButton.synth = synth;
    startButton.modals = modals;
    startButton.onclick = this.eventHandler;
    startButton.addEventListener("touchstart", this.eventHandler);
    this.startButton = startButton;
    this.modals = modals;
    // this.synth = synth;
  }

  eventHandler(event) {
    const targetElem = event.target;
    targetElem.synth.start();
    // TODO iterate over these instead expecting one
    targetElem.modals[0].classList.remove("active");
  };
}

module.exports = Ui;
