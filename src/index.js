const Gain = require("./gain.js");
const audio = require("./audio.js");
const chordMaker = require("./chord.js");
const gain = new Gain();
const helpers = require("./helpers.js");
const panner = require("./panner.js");
const tone = require("./tone.js");
let notes;

helpers.loadJSON("dist/notes.json", function(data) {
    notes = JSON.parse(data)

    const ctx1 = new AudioContext();
    const ctx2 = new AudioContext();
    const ctx3 = new AudioContext();
    const ctx4 = new AudioContext();
    const sineTone1Gain = gain.create(ctx1, .1);
    const sineTone2Gain = gain.create(ctx2, .1);
    const triangleTone1Gain = gain.create(ctx3, .04);
    const triangleTone2Gain = gain.create(ctx4, .04);
    const sineTone1Pan = ctx1.createStereoPanner();
    const sineTone2Pan = ctx2.createStereoPanner();
    const triangleTone1Pan = ctx3.createStereoPanner();
    const triangleTone2Pan = ctx4.createStereoPanner();
    sineTone1Pan.pan.value = -1;
    sineTone2Pan.pan.value = 1;
    triangleTone1Pan.pan.value = .75;
    triangleTone2Pan.pan.value = -.75;
    const sineTone1 = new tone(ctx1, "sine", sineTone1Gain, sineTone1Pan, notes);
    const sineTone2 = new tone(ctx2, "sine", sineTone2Gain, sineTone2Pan, notes);
    const triangleTone1 = new tone(ctx3, "triangle", triangleTone1Gain, triangleTone1Pan, notes);
    const triangleTone2 = new tone(ctx4, "triangle", triangleTone2Gain, triangleTone2Pan, notes);
    const sineTone1Out = ctx1.destination
    const sineTone2Out = ctx2.destination
    const triangleTone1Out = ctx3.destination
    const triangleTone2Out = ctx4.destination
    const playButtons = document.getElementsByClassName("play-button");

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

    const cChordContext = new AudioContext();

    const melody = [
        "C4",
        "E4",
        "G3",
        "F4",
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

        const chord1PanValue = -.3;
        const chord2PanValue = .3;
        const chord3PanValue = .6;
        const chord4PanValue = -.6;
        const cChord = new chordMaker(
            cChordContext,
            "sine",
            gain.create(cChordContext, .003),
            cChordContext.createStereoPanner(),
            chord1PanValue,
            cChordNotes,
            notes);
        const cChord2 = new chordMaker(
            cChordContext,
            "square",
            gain.create(cChordContext, .0025),
            cChordContext.createStereoPanner(),
            chord2PanValue,
            cChordNotes,
            notes);
        const cChord3 = new chordMaker(
            cChordContext,
            "triangle",
            gain.create(cChordContext, .0025),
            cChordContext.createStereoPanner(),
            chord3PanValue,
            cChordNotes,
            notes);
        const cChord4 = new chordMaker(
            cChordContext,
            "sawtooth",
            gain.create(cChordContext, .0025),
            cChordContext.createStereoPanner(),
            chord4PanValue,
            cChordNotes,
            notes);

            if (!sineTone1.connected) {
                console.log("Connecting...");

                window.setInterval(playMelody1, 5000)
                window.setInterval(playMelody2, 5200)
                window.setInterval(playMelody3, 5300)
                window.setInterval(playMelody4, 5400)
                triangleTone1.playNote("C2");
                triangleTone2.playNote("C2");
                sineTone1.playNote("C2");
                sineTone2.playNote("C2");

                cChord.connect();
                cChord2.connect();
                cChord3.connect();
                cChord4.connect();

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

                cChord.connect();
                cChord2.connect();
                cChord3.connect();
                cChord4.connect();
            }
        };
    });

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
});
