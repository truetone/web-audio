const audio = require("./audio.js");
const tone = require("./tone.js");
const Gain = require("./gain.js");
const gain = new Gain();

const signalChain1 = new AudioContext();
const signalChain2 = new AudioContext();
const sineTone1Gain = gain.create(signalChain1);
const sineTone2Gain = gain.create(signalChain2);
const sineTone1 = new tone(signalChain1, "sine", sineTone1Gain);
const sineTone2 = new tone(signalChain2, "sine", sineTone2Gain);
const sineTone1Out = signalChain1.destination
const sineTone2Out = signalChain2.destination
const playButtons = document.getElementsByClassName("play-button");


sineTone1Gain.gain.value = .1;
sineTone2Gain.gain.value = .1;

Array.prototype.forEach.call(playButtons, function(button) {
    button.onclick = function(e) {
        console.log(sineTone1);

        if (!sineTone1.connected) {
            console.log("Connecting...");
            sineTone1.play("C4");
            sineTone2.play("F4");
            sineTone1.connect()
            sineTone2.connect()
        } else {
            console.log("Disconnecting...");
            sineTone1.disconnect()
            sineTone2.disconnect()
        }
    };
});
