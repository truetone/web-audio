const Ui = require("../src/ui.js");
let start_button;
let modals;

beforeEach(() => {
  start_button = {
    onclick: null,
    addEventListener : jest.fn()
  };

  document.body.innerHTML =
  '<div id="listener">' +
  '  <div class="modal-layer active"></div>' +
  '  <button id="button" />' +
  '</div>';
  modals = document.getElementsByClassName("modal-layer");
});

describe("Ui.constructor", () => {
  it("should bind eventHandler to startButton.onclick", () => {
    const mock_synth = jest.fn();
    const ui = new Ui(modals, start_button, mock_synth);
    expect(ui.startButton).toBeDefined();
    expect(ui.startButton.onclick).toBeDefined();
  });

  it("should attach synth to startButton", () => {
    const mock_synth = jest.fn();
    const ui = new Ui(modals, start_button, mock_synth);
    expect(ui.startButton.synth).toBeDefined();
  });

  it("should add a 'touchstart' event listener with eventHandler as the callback", () => {
    const ui = new Ui(modals, start_button);
    expect(ui.startButton.addEventListener).toHaveBeenCalledWith("touchstart", ui.eventHandler);
  });
});

describe("Ui.eventHandler", () => {
  it("should call start on the synth", () => {
    const mock_synth = {
      start: jest.fn()
    };
    document.body.innerHTML =
    '<div id="listener">' +
    '  <div class="modal-layer active"></div>' +
    '  <button id="button" />' +
    '</div>';
    modals = document.getElementsByClassName("modal-layer");
    const start_button = document.getElementById("button");
    const ui = new Ui(modals, start_button, mock_synth);

    ui.startButton.click();

    expect(ui.startButton.synth.start).toHaveBeenCalled();
  });

  it("should remove the 'active' class from any modals", () => {
    const mock_synth = {
      start: jest.fn()
    };
    document.body.innerHTML =
    '<div id="listener">' +
    '  <div class="modal-layer active"></div>' +
    '  <button id="button" />' +
    '</div>';
    modals = document.getElementsByClassName("modal-layer");
    const start_button = document.getElementById("button");
    const ui = new Ui(modals, start_button, mock_synth);
    ui.startButton.click();

    expect(ui.modals[0].classList.length).toEqual(1);
    expect(ui.modals[0].classList[0]).toEqual("modal-layer");
  });
});
