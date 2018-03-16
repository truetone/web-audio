const Ui = require("../src/ui.js");
let start_button;

beforeEach(() => {
  start_button = {
    onclick: null,
    addEventListener : jest.fn()
  };
});

test("a new ui should bind eventHandler to the start button", () => {
  const ui = new Ui([], start_button);
  expect(ui.startButton).toBeDefined();
  expect(ui.startButton.onclick).toBeDefined();
});

test("a new ui should add a 'touchstart' event listener with evenHandler as the callback", () => {
  const ui = new Ui([], start_button);
  expect(ui.startButton.addEventListener).toHaveBeenCalledWith("touchstart", ui.eventHandler);
});
