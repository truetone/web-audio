const tone = require("./tone.js");

class Chord {
    constructor(ctx, toneType, gain, pan, panValue, chordNotes, notes) {
        const self = this;
        this.connected = false;
        this.tones = [];

        pan.pan.value = panValue;

        chordNotes.forEach((note) => {
            console.log("Creating new tone for note: ", note);
            const t = new tone(ctx, toneType, gain, pan, notes);
            t.playNote(note);
            self.tones.push(t);
        });

    }

    connect() {
        const self = this;
        this.connected = true;
        self.tones.forEach((t) => {
            console.log("Connecting tone: ", t.name);
            t.connect();
        });
    }

    disconnect() {
        const self = this;
        this.connected = false;
        self.tones.forEach((t) => {
            console.log("Disconnecting tone: ", t.name);
            t.disconnect();
        });
    }
}

module.exports = Chord;
