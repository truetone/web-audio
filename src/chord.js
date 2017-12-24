const tone = require("./tone.js");

class Chord {
    constructor(ctx, toneType, gain, pan, panValue, chordNotes, notes) {
        const self = this;
        this.connected = false;
        this.tones = [];

        pan.pan.value = panValue;

        Array.prototype.forEach.call(chordNotes, function(note) {
            console.log("Creating new tone for note: ", note);
            const t = new tone(ctx, toneType, gain, pan, notes);
            t.playNote(note);
            self.tones.push(t);
        });

    }

    connect() {
        const self = this;
        this.connected = true;
        Array.prototype.forEach.call(self.tones, function(t) {
            console.log("Connecting tone: ", t);
            t.connect();
        });
    }

    disconnect() {
        const self = this;
        this.connected = false;
        Array.prototype.forEach.call(self.tones, function(t) {
            console.log("Disconnecting tone: ", t);
            t.disconnect();
        });
    }
}

module.exports = Chord;
