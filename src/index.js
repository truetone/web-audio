const audio = require("./audio.js");
const tone = require("./tone.js");
const Gain = require("./gain.js");
const gain = new Gain();
const panner = require("./panner.js");

const signalChain1 = new AudioContext();
const signalChain2 = new AudioContext();
const signalChain3 = new AudioContext();
const signalChain4 = new AudioContext();
const sineTone1Gain = gain.create(signalChain1);
const sineTone2Gain = gain.create(signalChain2);
const triangleTone1Gain = gain.create(signalChain3);
const triangleTone2Gain = gain.create(signalChain4);
const sineTone1Pan = signalChain1.createStereoPanner();
const sineTone2Pan = signalChain2.createStereoPanner();
const triangleTone1Pan = signalChain3.createStereoPanner();
const triangleTone2Pan = signalChain4.createStereoPanner();
sineTone1Pan.pan.value = -1;
sineTone2Pan.pan.value = 1;
triangleTone1Pan.pan.value = .75;
triangleTone2Pan.pan.value = -.75;
const sineTone1 = new tone(signalChain1, "sine", sineTone1Gain, sineTone1Pan);
const sineTone2 = new tone(signalChain2, "sine", sineTone2Gain, sineTone2Pan);
const triangleTone1 = new tone(signalChain3, "triangle", triangleTone1Gain, triangleTone1Pan);
const triangleTone2 = new tone(signalChain4, "triangle", triangleTone2Gain, triangleTone2Pan);
const sineTone1Out = signalChain1.destination
const sineTone2Out = signalChain2.destination
const triangleTone1Out = signalChain3.destination
const triangleTone2Out = signalChain4.destination
const playButtons = document.getElementsByClassName("play-button");


sineTone1Gain.gain.value = .1;
sineTone2Gain.gain.value = .1;
triangleTone1Gain.gain.value = .1;
triangleTone2Gain.gain.value = .1;

const melody = [
    "C4",
    "E4",
    "F4",
    "G3",
    "C4",
    "G3"
];

const melody2 = [
    "E3",
    "C3",
    "G2",
    "F3",
    "C3"
];

const melody3 = [
    "C3",
    "E5",
    "F3",
    "G2",
    "C3",
    "A4"
];

let i, j, k, l;

Array.prototype.forEach.call(playButtons, function(button) {
    button.onclick = function(e) {
        if (!sineTone1.connected) {
            console.log("Connecting...");

            window.setInterval(playMelody1, 5000)
            window.setInterval(playMelody2, 5250)
            window.setInterval(playMelody3, 5500)
            window.setInterval(playMelody4, 5600)
            triangleTone1.play("C4");
            triangleTone2.play("C4");
            sineTone1.play("C4");
            sineTone2.play("C4");
            sineTone1.connect();
            sineTone2.connect();
            triangleTone1.connect();
            triangleTone2.connect();
        } else {
            console.log("Disconnecting...");
            sineTone1.disconnect();
            sineTone2.disconnect();
            triangleTone1.disconnect();
            triangleTone2.disconnect();
        }
    };
});

playMelody1 = function() {

    if (!i) {
        i = 0;
    }

    sineTone1.play(melody[i]);
    i++;

    if (i > (melody.length - 1)) {
        i = 0;
    }
}

playMelody2 = function() {
    if (!j) {
        j = 0;
    }

    // sineTone2.play(melody2[j]);
    sineTone2.play(melody[j]);
    j++;

    // if (j > melody2.length - 1) {
    if (j > melody.length - 1) {
        j = 0;
    }
}

playMelody3 = function() {
    if (!k) {
        k = 0;
    }

    // triangleTone1.play(melody3[k]);
    triangleTone1.play(melody[k]);
    k++;

    // if (k > melody3.length - 1) {
    if (k > melody.length - 1) {
        k = 0;
    }
}

playMelody4 = function() {
    if (!l) {
        l = 0;
    }

    // triangleTone1.play(melody3[k]);
    triangleTone2.play(melody[l]);
    l++;

    // if (k > melody3.length - 1) {
    if (l > melody.length - 1) {
        l = 0;
    }
}
