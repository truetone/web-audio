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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
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
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Gain = __webpack_require__(1);
const helpers = __webpack_require__(2);
const tone = __webpack_require__(0);
const gain = new Gain();
const scopeCanvas = document.getElementById('oscilloscope');
const scopeContext = scopeCanvas.getContext('2d');
const playButtons = document.getElementsByClassName("play-button");
const waveTypeCheckboxes = document.getElementsByClassName("wave-type-checkbox");
const noteCheckboxes = document.getElementsByClassName("note-checkbox");
let sineTone1;
let analyser;
let waveform;
let notes;

// Bind play buttons to click and touch events
Array.prototype.forEach.call(playButtons, function(button) {
    ['click', 'touch'].map(function(eventName) {
        console.log("Binding " + eventName + " to: ", button);
        button.addEventListener(eventName, pointerHandler);
    });
});

Array.prototype.forEach.call(waveTypeCheckboxes, function(cb) {
    ['click', 'touch'].map(function(eventName) {
        console.log("Binding " + eventName + " to: ", cb);
        cb.addEventListener(eventName, cbPointerHandler);
    });
});

Array.prototype.forEach.call(noteCheckboxes, function(cb) {
    ['click', 'touch'].map(function(eventName) {
        cb.addEventListener(eventName, noteCbPointerHandler);
    });
});

if (typeof window.AudioContext || window.webkitAudioContext == "function") {
    const ctx1 = new (window.AudioContext || window.webkitAudioContext)();
    const sineTone1Pan = ctx1.createStereoPanner();
    const sineTone1Gain = gain.create(ctx1, .1);
    analyser = ctx1.createAnalyser();
    sineTone1Gain.connect(analyser)
    waveform = new Float32Array(analyser.frequencyBinCount)
    scopeCanvas.width = waveform.length;
    scopeCanvas.height = 500;
    analyser.getFloatTimeDomainData(waveform)

    helpers.loadJSON("../../dist/notes.json", function(data) {
        notes = JSON.parse(data)
        sineTone1 = new tone(ctx1, "sine", sineTone1Gain, sineTone1Pan, notes);
        const sineTone1Out = ctx1.destination
    });
} else {
    const element = document.getElementById("warning");
    element.innerHTML = "<h1>Sorry, the Web Audio API is not supported on this browser</h1>";
}

function pointerHandler(event) {
    if (!sineTone1.connected) {
        console.log("Connecting...");
        sineTone1.playNote("C4");
        sineTone1.connect();
        updateWaveform();
        drawOscilloscope();
    } else {
        console.log("Disconnecting...");
        sineTone1.disconnect();
    }
};

function cbPointerHandler(event) {
    console.log(sineTone1);
    sineTone1.oscillator.type = this.value;
};

function noteCbPointerHandler(event) {
    sineTone1.playNote(this.value);
};

function updateWaveform() {
    requestAnimationFrame(updateWaveform)
    analyser.getFloatTimeDomainData(waveform)
};

function drawOscilloscope() {
    requestAnimationFrame(drawOscilloscope);
    scopeContext.clearRect(0, 0, scopeCanvas.width, scopeCanvas.height);
    scopeContext.beginPath();
    for (let i = 0; i < waveform.length; i++) {
        const x = i;
        const y = (0.5 + waveform[i] / 2) * scopeCanvas.height;
        if (i == 0) {
            scopeContext.moveTo(x, y);
        } else {
            scopeContext.lineTo(x, y);
        }
    }
    scopeContext.stroke();
};


/***/ })
/******/ ]);