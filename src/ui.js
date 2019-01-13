class Ui {
  constructor(modals, startButton, synth) {
    this.startButton = startButton;
    this.startButton.onclick = () => { this.eventHandler() };
    this.startButton.addEventListener("touchstart", this.eventHandler);
    this.startButton.synth = synth;
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
