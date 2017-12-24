class Gain {
    create(ctx, value) {
        console.log("Setting gain value to ", value);
        this.gain = ctx.createGain();
        this.gain.gain.value = value;
        return this.gain;
    }

    change(value) {
        console.log("Setting gain value to ", value);
        this.gain.gain.value = value;
    }
}

module.exports = Gain;
