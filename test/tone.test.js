const Tone = require("../src/tone");
const Notes = require("../src/notes");

let mockCtx;
let mockGain;
let mockCreateGain;
let mockGainConnect;
let mockCreateOscillator;
let mockCreatePanner;

beforeAll(() => {
  mockCtx = jest.fn();
  mockGain = jest.fn();
  mockCreateGain = jest.fn();
  mockGainConnect = jest.fn();
  mockCreateOscillator = jest.fn();
  mockCreatePanner = jest.fn();
  mockCreatePanner.mockReturnValue({});

  mockCreateGain.mockReturnValue({
      gain: {gain: 0},
      connect: jest.fn()}
  );

  mockGain.mockImplementation(() => {
    return {
      connect: mockGainConnect
    }
  });

  mockCreateOscillator.mockReturnValue({
      gain: null,
      start: jest.fn()}
  );

  mockCtx.mockImplementation(() => {
    return {
      createPanner: mockCreatePanner,
      createGain: mockCreateGain,
      createOscillator: mockCreateOscillator,
      destinaion: "mockDestination"
    };
  })
  .mockName("mockCtx");
});

describe("creating a tone", () => {
  it("has our expected name", () => {
    const ctx = new mockCtx();
    const tone = new Tone(ctx, "synth1", "sine", .01, 0, {});
    expect(tone.name).toEqual("synth1.Tone");
  });

  it("uses the AudioContext's destination", () => {
    const ctx = new mockCtx();
    const tone = new Tone(ctx, "synth1", "sine", .01, 0, {});
    expect(tone.destination).toEqual(ctx.destination);
  });

  it("does not automatically connect to the destination", () => {
    const ctx = new mockCtx();
    const tone = new Tone(ctx, "synth1", "sine", .01, 0, {});
    expect(tone.connected).toEqual(false);
  });
});
