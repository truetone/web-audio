const Gain = require("../gain.js");
const helpers = require("../helpers.js");
const tone = require("../tone.js");
const gain = new Gain();
const scopeCanvas = document.getElementById('oscilloscope');
const scopeContext = scopeCanvas.getContext('2d');
const playButtons = document.getElementsByClassName("play-button");
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
        sineTone1.connect();
        updateWaveform();
        drawOscilloscope();
    } else {
        console.log("Disconnecting...");
        sineTone1.disconnect();
    }
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
