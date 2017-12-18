const helpers = require("./helpers.js");


class Tone {
    constructor(signalChain, type, gain) {
        const self = this;
        this.signalChain = signalChain;
        this.oscillator = this.signalChain.createOscillator();
        this.oscillator.type = type;
        this.oscillator.connect(gain);
        this.oscillator.start();
        this.defaultFrequency = 261.33;
        this.lowestFrequency = 16.35;
        helpers.loadJSON("/dist/notes.json", function(data) {
            self.notes = JSON.parse(data);
        });

        this.connected = false;
        this.gain = gain;
    }

    connect() {
        this.connected = true;

        // connect the oscillator to the gain node
        this.oscillator.connect(this.gain);

        // connect the gain node to the destination
        this.gain.connect(this.signalChain.destination);
    }

    disconnect() {
        this.connected = false;
        this.oscillator.disconnect();
    }

    play(note) {
        this.oscillator.frequency.value = this.notes[note];
    }

    toggle() {
        if (this.connected) {
            this.disconnect();
        } else {
            this.connect();
        }
    }

}

module.exports = Tone
