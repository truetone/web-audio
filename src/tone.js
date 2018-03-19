class Tone {
    constructor(ctx, type, gain, panner, notes) {
        this.gain = gain;
        this.panner = panner;
        this.gain.connect(this.panner);
        this.ctx = ctx;
        this.oscillator = this.ctx.createOscillator();
        this.oscillator.type = type;
        this.oscillator.start();
        this.defaultFrequency = 261.33;
        this.lowestFrequency = 16.35;
        this.notes = notes;
        this.connected = false;
        this.melodyIndex;
    }

    connect() {
        this.connected = true;

        // connect the oscillator to the gain node
        this.oscillator.connect(this.gain);

        // connect the gain node to the panner
        this.gain.connect(this.panner);

        // connect the panner to the destination
        this.panner.connect(this.ctx.destination);
    }

    disconnect() {
        this.connected = false;
        this.oscillator.disconnect();
    }

    playNote(note) {
        if (typeof note === "undefined") {
            console.warn("Got undefined note")
        } else {
            console.log("Playing ", this.notes[note]);
            this.oscillator.frequency.value = this.notes[note];
        }
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
