const helpers = require("./helpers.js");


class Tone {
    constructor(signalChain, type) {
        const self = this;
        this.oscillator = signalChain.createOscillator();
        this.oscillator.type = type;
        this.oscillator.start();
        this.defaultFrequency = 261.33;
        this.lowestFrequency = 16.35;
        helpers.loadJSON("/dist/notes.json", function(data) {
            self.notes = JSON.parse(data);
        });

        this.connected = false;
        this.gain;
    }

    connect(gain) {
        this.gain = gain;
        this.connected = true;
        this.oscillator.connect(gain);
    }

    disconnect() {
        this.connected = false;
        this.oscillator.disconnect();
    }

    play(note) {
        this.oscillator.frequency.value = this.notes[note];
    }

    toggle() {
        if (!this.connected) {
            this.connect(this.gain);
        } else {
            this.disconnect();
        }
    }

}

module.exports = Tone
