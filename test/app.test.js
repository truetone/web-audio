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

describe("App.constructor", () => {
  it("a new app should call getElementById on the document with 'start-button' as the id", () => {
    const app = new App(document);
    expect(document.getElementById).toHaveBeenCalledWith('start-button');
  });

  it("a new app should call getElementsByClassName on the document with 'modal-layer' as the class", () => {
    document.getElementsByClassName = jest.fn();
    const app = new App(document);
    expect(document.getElementsByClassName).toHaveBeenCalledWith('modal-layer');
  });

  it("a new app should call the Ui.constructor w/ an array of modals", () => {
    const expected_modals = ['<div class="modal-layer"></div>'];
    const expected_start_button = "<button></button>";
    document.getElementById = jest.fn();
    document.getElementById.mockReturnValueOnce(expected_start_button);
    document.getElementsByClassName = jest.fn();
    document.getElementsByClassName.mockReturnValueOnce(expected_modals);
    const mock_event = jest.fn();
    const app = new App(document, mock_event);

    expect(Ui).toHaveBeenCalledTimes(1);
    expect(Ui).toHaveBeenCalledWith(expected_modals, expected_start_button, mock_event);
  });
});
