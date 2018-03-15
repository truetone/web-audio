class Ui {
  constructor(modals, startButton) {
    // bind events to our callback function
    startButton.onclick = this.eventHandler;
    startButton.addEventListener("touchstart", this.eventHandler);
  }

  eventHandler() {
    
  };
}

module.exports = Ui;
