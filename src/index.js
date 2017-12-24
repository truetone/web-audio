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
triangleTone1Gain.gain.value = .04;
triangleTone2Gain.gain.value = .04;

const melody = [
    "C4",
    "E4",
    "F4",
    "G3",
    "C4",
    "G3"
];

const melody2 = [
    "F4",
    "B4",
    "C4",
    "D3",
    "F4",
    "D2"
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
            window.setInterval(playMelody2, 5200)
            window.setInterval(playMelody3, 5300)
            window.setInterval(playMelody4, 5400)
            triangleTone1.playNote("C4");
            triangleTone2.playNote("C4");
            sineTone1.playNote("C4");
            sineTone2.playNote("C4");
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

changeElementNote = function(id, idx) {
    // set the corresponding css class for the note
    const element = document.getElementById(id);
    element.classList.remove("note-0", "note-6", "note-1", "note-2", "note-3", "note-4", "note-5");
    element.classList.add("note-" + idx);
    console.log(idx);
    element.textContent = "Note: " + melody[idx];
};

playMelody1 = function() {

    if (!i) {
        i = 0;
    }

    sineTone1.playNote(melody[i]);

    changeElementNote("tone-box-1", i);

    i++;

    if (i > (melody.length - 1)) {
        i = 0;
    }
}

playMelody2 = function() {
    if (!j) {
        j = 0;
    }

    // sineTone2.playNote(melody2[j]);
    sineTone2.playNote(melody[j]);
    changeElementNote("tone-box-2", j);
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

    // triangleTone1.playNote(melody3[k]);
    triangleTone1.playNote(melody[k]);
    changeElementNote("tone-box-3", k);
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

    // triangleTone1.playNote(melody3[k]);
    triangleTone2.playNote(melody[l]);
    changeElementNote("tone-box-4", l);
    l++;

    // if (k > melody3.length - 1) {
    if (l > melody.length - 1) {
        l = 0;
    }
}
