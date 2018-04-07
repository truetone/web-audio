const Synth = require("../src/synth");
const Context = require("../src/context");
const Tone = require("../src/tone");
let mockCtx;
let mockCreatePanner;
let mockCreateGain;
let mockGainConnect;
let mockCreateOscillator;
let mockGain;
const synthConfigs = [
  {
    name: "sine 1",
    type: "sine",
    gain: .1,
    pan: -1,
    note: "C4"
  },
  {
    name: "sine 2",
    type: "sine",
    gain: .1,
    pan: 1,
    note: "C4"
  }
];

beforeAll(() => {
  mockCtx = jest.fn();
  mockCreatePanner = jest.fn();
  mockCreateGain = jest.fn();
  mockCreateOscillator = jest.fn();
  mockGain = jest.fn();
  mockCreateGain.mockReturnValue({
      gain: {gain: 0},
      connect: jest.fn()}
  );
  mockCreateOscillator.mockReturnValue({
      gain: null,
      start: jest.fn()}
  );
  mockGainConnect = jest.fn();
  mockCreatePanner.mockReturnValue({});

  mockGain.mockImplementation(() => {
    return {
      connect: mockGainConnect
    }
  });

  mockGainConnect.mockImplementation(() => {
    return {
      connect: mockGainConnect
    }
  });

  mockCtx.mockImplementation(() => {
    return {
      createPanner: mockCreatePanner,
      createGain: mockCreateGain,
      createOscillator: mockCreateOscillator
    };
  })
  .mockName("mockCtx");
});

beforeEach(() => {
  mockCtx.mockClear();
  mockCreatePanner.mockClear();
});

describe("Synth.constructor", () => {

  it("sets our Context object", () => {
    const synth = new Synth(mockCtx, synthConfigs);
    expect(synth.audioContexts[0].name).toEqual("sine 1");
    expect(synth.audioContexts[1].name).toEqual("sine 2");
  });

  it("sets a context for each config", () => {
    const synth = new Synth(mockCtx, synthConfigs);
    expect(synth.audioContexts.length).toEqual(2);
  });

  describe("creating tones", () => {
    xit("creates a tone for each config", () => {
      const synth = new Synth(mockCtx, synthConfigs);
      expect(synth.tones.length).toEqual(2);
      expect(synth.tones[0]).toBeInstanceOf(Tone)
    });
  });
});
