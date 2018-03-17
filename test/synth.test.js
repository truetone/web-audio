const Synth = require("../src/synth.js");

describe("Synth.constructor", () => {
  it("should add a 'startsynth' event listener with evenHandler as the callback", () => {
    document.body.innerHTML =
    '<div id="synth"></div>';
    const targetElem = {
      addEventListener : jest.fn()
    };
    const synth = new Synth(targetElem);
    expect(synth.targetElem.addEventListener).toHaveBeenCalledWith("startsynth", synth.eventHandler);
  });
});

describe("Synth.eventHandler", () => {
  it("should call Synth.eventHandler on a startsynth event", () => {
    const startSynthEvent = new Event("startsynth", {bubbles: true});
    document.body.innerHTML = '<div id="synth"><button id="button" /></div>';
    const button = document.getElementById("button");
    const synthElem = document.getElementById("synth");
    const synth = new Synth(synthElem);
    synth.eventHandler = jest.fn();

    button.dispatchEvent(startSynthEvent);
    expect(synth.eventHandler).toHaveBeenCalled();
  });
});
