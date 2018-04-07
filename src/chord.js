const tone = require("./tone.js");

class Chord {
  constructor(ctx, name, toneType, gainValue, panValue, chordNotes, notes) {
    const self = this;
    this.connected = false;
    this.tones = [];
    this.name = name + ".Chord";

    chordNotes.forEach((note) => {
        console.log("Creating new tone for note: ", note);
        const t = new tone(ctx, self.name, toneType, gainValue, panValue, notes);
        t.playNote(note);
        self.tones.push(t);
    });
  }

  connect() {
    this.connected = true;
    this.tones.forEach((t) => {
        console.log("Connecting tone: ", t.name);
        t.connect();
    });
  }

  disconnect() {
    this.connected = false;
    this.tones.forEach((t) => {
        console.log("Disconnecting tone: ", t.name);
        t.disconnect();
    });
  }
}

module.exports = Chord;
