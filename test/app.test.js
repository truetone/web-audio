const App = require("../src/app.js");
const Synth = require("../src/synth.js");
const Ui = require("../src/ui.js");

jest.mock('../src/synth.js');
jest.mock('../src/ui.js');

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Synth.mockClear();
  Ui.mockClear();

  const addEventListener = jest.fn();
  const getElementByIdReturnValue = {
    addEventListener: addEventListener
  };

  document.getElementById = jest.fn();
  document.getElementById.mockReturnValueOnce(getElementByIdReturnValue);
});

test("a new app should call getElementById on the document with 'start-button' as the id", () => {
  const app = new App(document);

  expect(document.getElementById).toHaveBeenCalledWith('start-button');
});

test("a new app should call getElementsByClassName on the document with 'modal-layer' as the class", () => {
  document.getElementsByClassName = jest.fn();
  const app = new App(document);

  expect(document.getElementsByClassName).toHaveBeenCalledWith('modal-layer');
});

test("a new app should call the Synth.constructor w/ an array of modals", () => {
  const expected_modals = ['<div class="modal-layer"></div>'];
  document.getElementsByClassName = jest.fn();
  document.getElementsByClassName.mockReturnValueOnce(expected_modals);
  const app = new App(document);

  expect(Ui).toHaveBeenCalledTimes(1);
  expect(Ui).toHaveBeenCalledWith(expected_modals);
});

test("a new app should bind Synth.eventHandler to the start button", () => {
  const app = new App(document);

  expect(app.startButton.onclick).toBeDefined();
});

test("a new app should add a 'touchstart' event listener with ui.evenHandler as the callback", () => {
  const app = new App(document);

  expect(app.startButton.addEventListener).toHaveBeenCalledWith("touchstart", app.ui.eventHandler);
});
