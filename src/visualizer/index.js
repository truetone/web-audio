const Gain = require("../gain.js");
const helpers = require("../helpers.js");
const tone = require("../tone.js");
const gain = new Gain();

if (typeof window.AudioContext || window.webkitAudioContext == "function") {
    helpers.loadJSON("../../dist/notes.json", function(data) {
        notes = JSON.parse(data)

        const ctx1 = new (window.AudioContext || window.webkitAudioContext)();
        const sineTone1Pan = ctx1.createStereoPanner();
        const sineTone1Gain = gain.create(ctx1, .1);
        const sineTone1 = new tone(ctx1, "sine", sineTone1Gain, sineTone1Pan, notes);
        const sineTone1Out = ctx1.destination
        const playButtons = document.getElementsByClassName("play-button");

        Array.prototype.forEach.call(playButtons, function(button) {
            ['click', 'touch'].map(function(eventName) {
                console.log("Binding " + eventName + " to: ", button);
                button.addEventListener(eventName, pointerHandler);
            });
        });

        function pointerHandler(event) {
            if (!sineTone1.connected) {
                console.log("Connecting...");
                sineTone1.connect();
            } else {
                console.log("Disconnecting...");
                sineTone1.disconnect();
            }
        };
    });
} else {
    const element = document.getElementById("warning");
    element.innerHTML = "<h1>Sorry, the Web Audio API is not supported on this browser</h1>";
}
