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

const audio = __webpack_require__(1);
const tone = __webpack_require__(2);
const Gain = __webpack_require__(4);
const gain = new Gain();
const panner = __webpack_require__(5);

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

playMelody1 = function() {

    if (!i) {
        i = 0;
    }

    sineTone1.playNote(melody[i]);
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
    l++;

    // if (k > melody3.length - 1) {
    if (l > melody.length - 1) {
        l = 0;
    }
}


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
/***/ (function(module, exports, __webpack_require__) {

const helpers = __webpack_require__(3);


class Tone {
    constructor(signalChain, type, gain, panner) {
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
        helpers.loadJSON("/dist/notes.json", function(data) {
            self.notes = JSON.parse(data);
        });

        this.connected = false;
        // this.melody;
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
            console.log(this.notes);
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
    create(ctx) {
        return ctx.createGain();
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


/***/ })
/******/ ]);