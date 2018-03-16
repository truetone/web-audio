const Ui = require("../src/ui.js");
let start_button;

beforeEach(() => {
  start_button = {
    onclick: null,
    addEventListener : jest.fn()
  };
});

describe("Ui.constructor", () => {
  it("a new ui should bind eventHandler to startButton.onclick", () => {
    const mock_event = jest.fn();
    const ui = new Ui([], start_button, mock_event);
    expect(ui.startButton).toBeDefined();
    expect(ui.startButton.onclick).toBeDefined();
  });

  it("a new ui should add a 'touchstart' event listener with evenHandler as the callback", () => {
    const ui = new Ui([], start_button);
    expect(ui.startButton.addEventListener).toHaveBeenCalledWith("touchstart", ui.eventHandler);
  });

  it("should attach our custom event to the startButton object", () => {
    const ui = new Ui([], start_button, {});
    expect(ui.startButton.startSynthEvent).toBeDefined();
  });
});

describe("Ui.eventHandler", () => {
  it("should trigger a startsynth event on click or touchstart", () => {
    document.body.innerHTML =
    '<div id="listener">' +
    '  <button id="button" />' +
    '</div>';
    const button = document.getElementById("button");
    const listener = document.getElementById("listener");
    const customEvent = new Event("startsynth", {bubbles: true});
    const ui = new Ui([], button, customEvent);
    listener.gotMessage = false;
    listener.addEventListener("startsynth", function() { listener.gotMessage = true; });
    button.click();
    expect(listener.gotMessage).toEqual(true);
  });
});
