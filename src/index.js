const audio = require("./audio.js");
const tone = require("./tone.js");
const Gain = require("./gain.js");
const gain = new Gain();
const panner = require("./panner.js");

const signalChain1 = new AudioContext();
const signalChain2 = new AudioContext();
const sineTone1Gain = gain.create(signalChain1);
const sineTone2Gain = gain.create(signalChain2);
const sineTone1Pan = signalChain1.createStereoPanner();
const sineTone2Pan = signalChain2.createStereoPanner();
sineTone1Pan.pan.value = -1;
sineTone2Pan.pan.value = 1;
const sineTone1 = new tone(signalChain1, "sine", sineTone1Gain, sineTone1Pan);
const sineTone2 = new tone(signalChain2, "sine", sineTone2Gain, sineTone2Pan);
console.log(sineTone1Pan);
const sineTone1Out = signalChain1.destination
const sineTone2Out = signalChain2.destination
const playButtons = document.getElementsByClassName("play-button");


sineTone1Gain.gain.value = .1;
sineTone2Gain.gain.value = .1;

const melody = [
    "C4",
    "E4",
    "F4",
    "G3",
    "C4"
];

const melody2 = [
    "E3",
    "C3",
    "G2",
    "F3",
    "C3"
];

let currentNote;
let i;

Array.prototype.forEach.call(playButtons, function(button) {
    button.onclick = function(e) {
        console.log(sineTone1);

        if (!sineTone1.connected) {
            console.log("Connecting...");
            // sineTone1.play("C4");
            // sineTone2.play("F4");

            window.setInterval(playMelody1, 5000)
            window.setInterval(playMelody2, 7000)
            sineTone1.connect();
            sineTone2.connect();
        } else {
            console.log("Disconnecting...");
            sineTone1.disconnect();
            sineTone2.disconnect();
        }
    };
});

playMelody1 = function() {

    if (!currentNote) {
        i = 0;
        currentNote = i;
    }

    console.log("Playing ", melody[i]);
    sineTone1.play(melody[i]);
    i++;
    currentNote = i;

    if (i > (melody.length - 1)) {
        i = 0;
    }
}

playMelody2 = function() {
    if (!currentNote) {
        currentNote = i;
    }

    console.log("Playing ", melody2[i]);
    sineTone2.play(melody2[i]);
    i++;
    currentNote = i;

    if (i > melody2.length - 1) {
        i = 0;
    }
}
