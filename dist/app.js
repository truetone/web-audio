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

const App = __webpack_require__(1);

const app = new App(doc = window.document);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Synth = __webpack_require__(2);
const Ui = __webpack_require__(9);

const configs = [
  {
    name: "sine 1",
    type: "sine",
    gain: .1,
    pan: -1,
    chordNotes:[
      "C3",
      "C4",
      "C5",
      "E3",
      "E4",
      "E5",
      "G3",
      "G4",
      "G5"
    ]
  }
];

class App {
  constructor(doc = document) {
    const modals = doc.getElementsByClassName("modal-layer");
    const startButton = doc.getElementById("start-button");
    this.synth = new Synth(window.AudioContext, configs);
    this.ui = new Ui(modals, startButton, this.synth);
  }
}

module.exports = App


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Notes = __webpack_require__(3);
const Context = __webpack_require__(4);
const Chord = __webpack_require__(5);

class Synth {
  constructor(ctxClass, configs) {
    this.audioContexts = [];
    this.chords = [];
    this.notes = Notes.getNotes();
    this.ctxClass = ctxClass;

    configs.forEach((config) => {
      const ctx = this.createContext(config.name);
      this.audioContexts.push(ctx);
      this.chords.push(this.createChord(ctx.ctx, config.name, config.type, config.gain, config.pan, config.chordNotes));
    });
  }

  createContext(name) {
    return new Context(this.ctxClass, name);
  }

  createChord(ctx, name, type, gain, pan, chordNotes) {
    return new Chord(ctx, name, type, gain, pan, chordNotes, this.notes);
  }

  start() {
    this.chords.forEach((chord) => {
      chord.connect();
    });
  }

  stop() {
    this.chords.forEach((chord) => {
      chord.disconnect();
    });
  }
}

module.exports = Synth;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Notes {
  static getNotes() {
    return {
      "C0": 16.35,
      "C#0/Db0": 17.32,
      "D0": 18.35,
      "D#0/Eb0": 19.45,
      "E0": 20.6,
      "F0": 21.83,
      "F#0/Gb0": 23.12,
      "G0": 24.5,
      "G#0/Ab0": 25.96,
      "A0": 27.5,
      "A#0/Bb0": 29.14,
      "B0": 30.87,
      "C1": 32.7,
      "C#1/Db1": 34.65,
      "D1": 36.71,
      "D#1/Eb1": 38.89,
      "E1": 41.2,
      "F1": 43.65,
      "F#1/Gb1": 46.25,
      "G1": 49,
      "G#1/Ab1": 51.91,
      "A1": 55,
      "A#1/Bb1": 58.27,
      "B1": 61.74,
      "C2": 65.41,
      "C#2/Db2": 69.3,
      "D2": 73.42,
      "D#2/Eb2": 77.78,
      "E2": 82.41,
      "F2": 87.31,
      "F#2/Gb2": 92.5,
      "G2": 98,
      "G#2/Ab2": 103.83,
      "A2": 110,
      "A#2/Bb2": 116.54,
      "B2": 123.47,
      "C3": 130.81,
      "C#3/Db3": 138.59,
      "D3": 146.83,
      "D#3/Eb3": 155.56,
      "E3": 164.81,
      "F3": 174.61,
      "F#3/Gb3": 185,
      "G3": 196,
      "G#3/Ab3": 207.65,
      "A3": 220,
      "A#3/Bb3": 233.08,
      "B3": 246.94,
      "C4": 261.63,
      "C#4/Db4": 277.18,
      "D4": 293.66,
      "D#4/Eb4": 311.13,
      "E4": 329.63,
      "F4": 349.23,
      "F#4/Gb4": 369.99,
      "G4": 392,
      "G#4/Ab4": 415.3,
      "A4": 440,
      "A#4/Bb4": 466.16,
      "B4": 493.88,
      "C5": 523.25,
      "C#5/Db5": 554.37,
      "D5": 587.33,
      "D#5/Eb5": 622.25,
      "E5": 659.26,
      "F5": 698.46,
      "F#5/Gb5": 739.99,
      "G5": 783.99,
      "G#5/Ab5": 830.61,
      "A5": 880,
      "A#5/Bb5": 932.33,
      "B5": 987.77,
      "C6": 1046.5,
      "C#6/Db6": 1108.73,
      "D6": 1174.66,
      "D#6/Eb6": 1244.51,
      "E6": 1318.51,
      "F6": 1396.91,
      "F#6/Gb6": 1479.98,
      "G6": 1567.98,
      "G#6/Ab6": 1661.22,
      "A6": 1760,
      "A#6/Bb6": 1864.66,
      "B6": 1975.53,
      "C7": 2093,
      "C#7/Db7": 2217.46,
      "D7": 2349.32,
      "D#7/Eb7": 2489.02,
      "E7": 2637.02,
      "F7": 2793.83,
      "F#7/Gb7": 2959.96,
      "G7": 3135.96,
      "G#7/Ab7": 3322.44,
      "A7": 3520,
      "A#7/Bb7": 3729.31,
      "B7": 3951.07,
      "C8": 4186.01,
      "C#8/Db8": 4434.92,
      "D8": 4698.64,
      "D#8/Eb8": 4978.03
    }
  }
}

module.exports = Notes


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Context {
  constructor(ctxClass, name) {
    this.ctx = new ctxClass();
    this.name = name;
  }
}

module.exports = Context;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const tone = __webpack_require__(6);

class Chord {
  constructor(ctx, name, toneType, gainValue, panValue, chordNotes, notes) {
    const self = this;
    this.connected = false;
    this.tones = [];
    this.name = name + ".Chord";

    chordNotes.forEach((note) => {
      console.log("Creating new tone for note: ", note);
      const name = self.name + "." + toneType + "." + note;
      const t = new tone(ctx, name, toneType, gainValue, panValue, notes);
      t.playNote(note);
      self.tones.push(t);
    });
  }

  connect() {
    this.connected = true;
    this.tones.forEach((t) => {
        console.log("Connecting tone: ", t.name);
        t.connect();
    });
  }

  disconnect() {
    this.connected = false;
    this.tones.forEach((t) => {
        console.log("Disconnecting tone: ", t.name);
        t.disconnect();
    });
  }
}

module.exports = Chord;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const gain = __webpack_require__(7);
const panner = __webpack_require__(8);

class Tone {
  constructor(ctx, name, type, gain_value, panner_value, notes) {
    this.name = name + ".Tone";
    this.gain = new gain(ctx, this.name, gain_value);
    this.panner = new panner(ctx, name, panner_value);
    this.destination = ctx.destination;
    this.oscillator = this.startOscillator(ctx, type);
    // TODO set up Notes class to know what these are
    // this.defaultFrequency = 261.33;
    // this.lowestFrequency = 16.35;
    // this.highestFrequency = 4978.03;
    this.notes = notes;
    this.connected = false;
  }

  connect() {
    this.connected = true;

    // connect the oscillator to the gain node
    this.oscillator.connect(this.gain);

    // connect the gain node to the panner
    this.gain.gain.connect(this.panner);

    // connect the panner to the destination
    this.panner.panner.connect(this.destination);
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

  startOscillator(ctx, type) {
    const oscillator = ctx.createOscillator();
    oscillator.type = type;
    oscillator.start();
    return oscillator;
  }

}

module.exports = Tone


/***/ }),
/* 7 */
/***/ (function(module, exports) {

class Gain {
  constructor(ctx, name, value) {
    this.name = name + ".Gain";
    this.gain = ctx.createGain();
    this.set(value);
  }

  set(value) {
    console.log("Setting gain value to ", value);
    this.gain.gain.value = value;
  }

  get() {
    return this.gain.gain.value;
  }
}

module.exports = Gain;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

class Panner {
  constructor(ctx, name, value) {
    this.name = name + ".Panner";
    this.panner = ctx.createPanner();
    this.set(value);
  }

  set(value) {
    this.panner.value = value;
  }

  get() {
    return this.panner.value;
  }
}

module.exports = Panner;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

class Ui {
  constructor(modals, startButton, synth) {
    startButton.onclick = () => { this.eventHandler() };
    // startButton.addEventListener("touchstart", this.eventHandler);
    this.modals = modals;
    this.synth = synth;
  }

  eventHandler(event) {
    console.log(this);
    this.synth.start();
    // TODO iterate over these instead expecting one
    this.modals[0].classList.remove("active");
  };
}

module.exports = Ui;


/***/ })
/******/ ]);