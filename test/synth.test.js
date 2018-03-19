const Synth = require("../src/synth.js");
const Context = require("../src/context.js");

describe("Synth.constructor", () => {
  const toneConfigs = [
    {
      type: "sine",
      gain: .1,
      pan: -1,
      note: "C4"
    },
    {
      type: "sine",
      gain: .1,
      pan: 1,
      note: "C4"
    }
  ];

  it("sets our Context object", () => {
    const mockCtx = jest.fn();
    const synth = new Synth(mockCtx, toneConfigs);
    expect(synth.audioContexts[0]).toBeInstanceOf(Context)
  });

  it("sets a context to for each config", () => {
    const mockCtx = jest.fn();
    const synth = new Synth(mockCtx, toneConfigs);
    expect(synth.audioContexts.length).toEqual(2);
  });

  it("creates a Tone instance for each tone config we pass in", () => {
    const toneConfigs = [
      {
        type: "sine",
        gain: .1,
        pan: -1,
        note: "C4"
      }
    ];
    const config = toneConfigs[0];
    const mockCtx = jest.fn();
    const synth = new Synth(mockCtx, toneConfigs);
    synth.createTone = jest.fn();

    expect(synth.createTone).toHaveBeenCalledWith(mockCtx, config.type, config.gain, config.pan);
  });
});
