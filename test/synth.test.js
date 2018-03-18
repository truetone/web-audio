const Synth = require("../src/synth.js");
const Context = require("../src/context.js");

describe("Synth.constructor", () => {
  it("sets a default number of Context objects", () => {
    const mockCtx = jest.fn();
    const synth = new Synth(mockCtx);
    expect(synth.audioContexts.length).toEqual(6);
  });

  it("sets a specified number of contexts if we pass in a second param", () => {
    const mockCtx = jest.fn();
    const synth = new Synth(mockCtx, 1);
    expect(synth.audioContexts.length).toEqual(1);
  });

  it("sets our Context object", () => {
    const mockCtx = jest.fn();
    const synth = new Synth(mockCtx, 1);
    expect(synth.audioContexts[0]).toBeInstanceOf(Context)
  });
});
