class Ui {
  constructor(modals, startButton, synth) {
    startButton.onclick = () => { this.eventHandler() };
    // startButton.addEventListener("touchstart", this.eventHandler);
    this.modals = modals;
    this.synth = synth;
  }

  eventHandler(event) {
    console.log(this);
    this.synth.start();
    // TODO iterate over these instead expecting one
    this.modals[0].classList.remove("active");
  };
}

module.exports = Ui;
