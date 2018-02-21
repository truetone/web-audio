const Gain = require("./gain.js");
const audio = require("./audio.js");
const chordMaker = require("./chord.js");
const gain = new Gain();
const helpers = require("./helpers.js");
const panner = require("./panner.js");
const tone = require("./tone.js");
let notes;

const startButton = document.getElementById("start-button");
const modals = document.getElementsByClassName("modal-layer");

// TODO make this not-global
function getRandom() {
  const n = Math.floor(Math.random() * (7000 - 4000 + 1)) + 4000;
  console.log("Random integer between 7000 and 4000:", n);
  return n;
};

if (typeof window.AudioContext || window.webkitAudioContext == "function") {
    helpers.loadJSON("../dist/notes.json", function(data) {

        notes = JSON.parse(data)

        const ctx1 = new (window.AudioContext || window.webkitAudioContext)();
        const ctx2 = new (window.AudioContext || window.webkitAudioContext)();
        const ctx3 = new (window.AudioContext || window.webkitAudioContext)();
        const ctx4 = new (window.AudioContext || window.webkitAudioContext)();
        const ctx5 = new (window.AudioContext || window.webkitAudioContext)();
        const sineTone1Gain = gain.create(ctx1, .1);
        const sineTone2Gain = gain.create(ctx2, .1);
        const sineTone3Gain = gain.create(ctx5, .08);
        const triangleTone1Gain = gain.create(ctx3, .04);
        const triangleTone2Gain = gain.create(ctx4, .04);
        const sineTone1Pan = ctx1.createStereoPanner();
        const sineTone2Pan = ctx2.createStereoPanner();
        const sineTone3Pan = ctx5.createStereoPanner();
        const triangleTone1Pan = ctx3.createStereoPanner();
        const triangleTone2Pan = ctx4.createStereoPanner();
        sineTone1Pan.pan.value = -1;
        triangleTone1Pan.pan.value = -.75;
        triangleTone2Pan.pan.value = .75;
        sineTone2Pan.pan.value = 1;
        sineTone3Pan.pan.value = 0;
        const sineTone1 = new tone(ctx1, "sine", sineTone1Gain, sineTone1Pan, notes);
        const sineTone2 = new tone(ctx2, "sine", sineTone2Gain, sineTone2Pan, notes);
        const sineTone3 = new tone(ctx5, "sine", sineTone3Gain, sineTone3Pan, notes);
        const triangleTone1 = new tone(ctx3, "triangle", triangleTone1Gain, triangleTone1Pan, notes);
        const triangleTone2 = new tone(ctx4, "triangle", triangleTone2Gain, triangleTone2Pan, notes);
        const sineTone1Out = ctx1.destination
        const sineTone2Out = ctx2.destination
        const sineTone3Out = ctx5.destination
        const triangleTone1Out = ctx3.destination
        const triangleTone2Out = ctx4.destination

        const eventHandler = function() {
            modals[0].classList.remove("active");

            const cChordContext = new AudioContext();
            const cChordNotes = [
                "C3",
                "C4",
                "C5",
                "E3",
                "E4",
                "E5",
                "G3",
                "G4",
                "G5"
            ];
            const chord1PanValue = -.3;
            const chord2PanValue = .3;
            const chord3PanValue = .6;
            const chord4PanValue = -.6;
            const cChord = new chordMaker(cChordContext, "sine", gain.create(cChordContext, .003), cChordContext.createStereoPanner(), chord1PanValue, cChordNotes, notes);
            const cChord2 = new chordMaker(cChordContext, "square", gain.create(cChordContext, .0025), cChordContext.createStereoPanner(), chord2PanValue, cChordNotes, notes);
            const cChord3 = new chordMaker(cChordContext, "triangle", gain.create(cChordContext, .0025), cChordContext.createStereoPanner(), chord3PanValue, cChordNotes, notes);
            const cChord4 = new chordMaker( cChordContext, "sawtooth", gain.create(cChordContext, .0025), cChordContext.createStereoPanner(), chord4PanValue, cChordNotes, notes);

            if (!sineTone1.connected) {
                console.log("Connecting...");
                window.setInterval(playMelody1, getRandom());
                window.setInterval(playMelody3, getRandom());
                window.setInterval(playMelody4, getRandom());
                window.setInterval(playMelody2, getRandom());
                window.setInterval(playMelody5, getRandom());
                triangleTone1.playNote("C2");
                triangleTone2.playNote("C2");
                sineTone1.playNote("C2");
                sineTone2.playNote("C2");
                sineTone3.playNote("C1");

                cChord.connect();
                cChord2.connect();
                cChord3.connect();
                cChord4.connect();

                sineTone1.connect();
                sineTone2.connect();
                sineTone3.connect();
                triangleTone1.connect();
                triangleTone2.connect();
            } else {
                console.log("Disconnecting...");
                sineTone1.disconnect();
                sineTone2.disconnect();
                sineTone3.disconnect();
                triangleTone1.disconnect();
                triangleTone2.disconnect();

                cChord.connect();
                cChord2.connect();
                cChord3.connect();
                cChord4.connect();
            }
        }

        // bind events to our callback function
        startButton.onclick = eventHandler;
        startButton.addEventListener("touchstart", eventHandler);

        const melody = [
            "C4",
            "E4",
            "D4",
            "G4",
            "F4",
            "A#3/Bb3"
        ];

        const melodyDeep = [
            "C2",
            "G2",
            "C2",
            "E2"
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

        let i, j, k, l, m;


        changeBassElementNote = function(id, idx) {
            // set the corresponding css class for the note
            const element = document.getElementById(id);
            element.classList.remove("bass-note-0", "bass-note-6", "bass-note-1", "bass-note-2", "bass-note-3", "bass-note-4", "bass-note-5");
            element.classList.add("bass-note-" + idx);
            element.textContent = "Note: " + melodyDeep[idx];
        }

        changeElementNote = function(id, idx) {
            // set the corresponding css class for the note
            const element = document.getElementById(id);
            element.classList.remove("note-0", "note-6", "note-1", "note-2", "note-3", "note-4", "note-5");
            element.classList.add("note-" + idx);
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

        playMelody5 = function() {
            if (!m) {
                m = 0;
            }

            // sineTone2.playNote(melody2[m]);
            sineTone3.playNote(melodyDeep[m]);
            changeBassElementNote("tone-box-5", m);
            m++;

            // if (m > melody2.length - 1) {
            if (m > melodyDeep.length - 1) {
                m = 0;
            }
        }
    });
} else {
    const element = document.getElementById("warning");
    element.innerHTML = "<h1>Sorry, the Web Audio API is not supported on this browser</h1>";
}
