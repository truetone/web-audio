const audio = require("./audio.js");
const tone = require("./tone.js");
const Gain = require("./gain.js");
const gain = new Gain();

const signalChain1 = new AudioContext();
const signalChain2 = new AudioContext();
const sineTone1 = new tone(signalChain1, "sine");
const sineTone2 = new tone(signalChain2, "sine");
const sineTone1Gain = gain.create(signalChain1);
const sineTone2Gain = gain.create(signalChain2);
const sineTone1Out = signalChain1.destination
const sineTone2Out = signalChain2.destination

const playButtons = document.getElementsByClassName("play-button");


sineTone1Gain.gain.value = .1;
sineTone1.connect(sineTone1Gain);

Array.prototype.forEach.call(playButtons, function(button) {
    button.onclick = function(e) {
        sineTone1.play("C4");
        if (!sineTone1.connected) {
            sineTone1Gain.connect(sineTone1Out)
        } else {
            sineTone1Gain.disconnect()
        }
    };
});
