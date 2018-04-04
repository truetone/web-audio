const Synth = require("../src/synth");
const Context = require("../src/context");
const Tone = require("../src/tone");
let mockCtx;
let mockCreatePanner;
let mockCreateGain;
let mockGainConnect;
let mockCreateOscillator;
let mockGain;
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
    const synth = new Synth(mockCtx, toneConfigs);
    console.log(mockCtx.getMockImplementation());
    expect(synth.audioContexts[0]).toBe(mockCtx.mock)
  });

  // xit("sets a context to for each config", () => {
  //   const synth = new Synth(mockCtx, toneConfigs);
  //   expect(synth.audioContexts.length).toEqual(2);
  // });

  // describe("creating tones", () => {
  //   xit("creates a tone for each config", () => {
  //     // const mockCtx = jest.fn();
  //     const synth = new Synth(mockCtx, toneConfigs);
  //     expect(synth.tones.length).toEqual(2);
  //     expect(synth.tones[0]).toBeInstanceOf(Tone)
  //   });
  // });
});
