/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Gain = __webpack_require__(4);
const audio = __webpack_require__(1);
const chordMaker = __webpack_require__(6);
const gain = new Gain();
const helpers = __webpack_require__(3);
const panner = __webpack_require__(5);
const tone = __webpack_require__(2);
let notes;

helpers.loadJSON("../dist/notes.json", function(data) {
    notes = JSON.parse(data)

    const ctx1 = new AudioContext();
    const ctx2 = new AudioContext();
    const ctx3 = new AudioContext();
    const ctx4 = new AudioContext();
    const ctx5 = new AudioContext();
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
    // const playButtons = document.getElementsByClassName("play-button");

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

    // Array.prototype.forEach.call(playButtons, function(button) {
    window.onload = function(e) {
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
            window.setInterval(playMelody1, 5000);
            window.setInterval(playMelody3, 5100);
            window.setInterval(playMelody4, 5300);
            window.setInterval(playMelody2, 5400);
            window.setInterval(playMelody5, 2500);
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Audio {
    audioSupported() {
        return typeof AudioContext == "function"
    }

    createContext() {
        return new AudioContext();
    }
}

module.exports = Audio;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Tone {
    constructor(signalChain, type, gain, panner, notes) {
        const self = this;
        this.gain = gain;
        this.panner = panner;
        this.gain.connect(this.panner);
        this.signalChain = signalChain;
        this.oscillator = this.signalChain.createOscillator();
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
        this.panner.connect(this.signalChain.destination);
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Helpers {
    static loadJSON(path, callback) {
        const xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', path, true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }
}

module.exports = Helpers;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Panner {
    static create (ctx, value) {
        const panner = ctx.createPanner();
        panner.value = value;
        return panner
    }
}

module.exports = Panner;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const tone = __webpack_require__(2);

class Chord {
    constructor(ctx, toneType, gain, pan, panValue, chordNotes, notes) {
        const self = this;
        this.connected = false;
        this.tones = [];

        pan.pan.value = panValue;

        Array.prototype.forEach.call(chordNotes, function(note) {
            console.log("Creating new tone for note: ", note);
            const t = new tone(ctx, toneType, gain, pan, notes);
            t.playNote(note);
            self.tones.push(t);
        });

    }

    connect() {
        const self = this;
        this.connected = true;
        Array.prototype.forEach.call(self.tones, function(t) {
            console.log("Connecting tone: ", t);
            t.connect();
        });
    }

    disconnect() {
        const self = this;
        this.connected = false;
        Array.prototype.forEach.call(self.tones, function(t) {
            console.log("Disconnecting tone: ", t);
            t.disconnect();
        });
    }
}

module.exports = Chord;


/***/ })
/******/ ]);