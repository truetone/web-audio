const Ui = require("../src/ui.js");
let start_button;

beforeEach(() => {
  start_button = {
    onclick: null,
    addEventListener : jest.fn()
  };
});

describe("Ui.constructor", () => {
  it("should bind eventHandler to startButton.onclick", () => {
    const mock_event = jest.fn();
    const ui = new Ui([], start_button, mock_event);
    expect(ui.startButton).toBeDefined();
    expect(ui.startButton.onclick).toBeDefined();
  });

  it("should add a 'touchstart' event listener with evenHandler as the callback", () => {
    const ui = new Ui([], start_button);
    expect(ui.startButton.addEventListener).toHaveBeenCalledWith("touchstart", ui.eventHandler);
  });

  it("should attach our custom event to the startButton object", () => {
    const ui = new Ui([], start_button, {});
    expect(ui.startButton.startSynthEvent).toBeDefined();
  });
});

describe("Ui.eventHandler", () => {
  it("should trigger a startsynth event on click", () => {
    document.body.innerHTML =
    '<div id="listener">' +
    '  <button id="button" />' +
    '</div>';
    const button = document.getElementById("button");
    const listener = document.getElementById("listener");
    const customEvent = new Event("startsynth", {bubbles: true});
    const ui = new Ui([], button, customEvent);
    listener.gotClick = false;
    listener.gotTouch = false;
    listener.addEventListener("startsynth", function() { listener.gotClick = true; });
    button.click();
    expect(listener.gotClick).toEqual(true);
  });

  it("should trigger a startsynth event on touchstart", () => {
    document.body.innerHTML =
    '<div id="listener">' +
    '  <button id="button" />' +
    '</div>';
    const button = document.getElementById("button");
    const listener = document.getElementById("listener");
    const customEvent = new Event("startsynth", {bubbles: true});
    const ui = new Ui([], button, customEvent);
    const touchEvent = new TouchEvent("touchstart");
    listener.gotTouch = false;
    listener.addEventListener("startsynth", function() { listener.gotTouch = true; });
    button.dispatchEvent(touchEvent);
    expect(listener.gotTouch).toEqual(true);
  });

  // Synth's event listener will have to stop propagation like the listener below
  // it("should trigger a startsynth event that does not propagate", () => {
  //   document.body.innerHTML =
  //   '<div id="parent">' +
  //     '<div id="listener">' +
  //     '  <button id="button" />' +
  //     '</div>' +
  //   '</div>';
  //   const button = document.getElementById("button");
  //   const listener = document.getElementById("listener");
  //   const parentElem = document.getElementById("parent");
  //   const customEvent = new Event("startsynth", {bubbles: true});
  //   const ui = new Ui([], button, customEvent);
  //   const touchEvent = new TouchEvent("touchstart");

  //   listener.gotTouch = false;
  //   listener.addEventListener("startsynth", function(e) { listener.gotTouch = true; e.stopPropagation(); });

  //   parentElem.gotTouch = false;
  //   parentElem.addEventListener("startsynth", function() { parentElem.gotTouch = true; });

  //   button.dispatchEvent(touchEvent);

  //   expect(parentElem.gotTouch).toEqual(false);
  // });
});
