class Ui {
  constructor(modals, startButton, startSynthEvent) {
    // bind events to our callback function
    startButton.startSynthEvent = startSynthEvent;
    startButton.onclick = this.eventHandler;
    startButton.addEventListener("touchstart", this.eventHandler);
    this.startButton = startButton
  }

  eventHandler(event) {
    const target = event.target;
    target.dispatchEvent(target.startSynthEvent);
  };
}

module.exports = Ui;
