const Chord = require("../src/chord");

let mockCtx;
let mockCreateGain;
let mockCreatePanner;
let mockCreateOscillator;

beforeAll(() => {
  mockCtx = jest.fn();
  mockCreateGain = jest.fn();
  mockCreateOscillator = jest.fn();
  mockCreateOscillator.mockReturnValue({
    type: null,
    start: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    frequency: {value: 0}
  });
  mockCreateGain.mockReturnValue({
    gain: {gain: 0},
    connect: jest.fn()
  });
  mockCreatePanner = jest.fn();
  mockCreatePanner.mockReturnValue({
    connect: jest.fn()
  });
  mockCtx.mockImplementation(() => {
    return {
      createGain: mockCreateGain,
      createPanner: mockCreatePanner,
      createOscillator: mockCreateOscillator
    };
  })
  .mockName("mockCtx");
});

describe("creating new Chord instances", () => {
  it("has our expected name", ()=> {
    const ctx = new mockCtx();
    const chord = new Chord(ctx, "synth1", "sine", .01, 0, ["C4"], {"C4": 1});
    expect(chord.name).toEqual("synth1.Chord");
  });

  it("has matching tones", ()=> {
    const ctx = new mockCtx();
    const chord = new Chord(ctx, "synth1", "sine", .01, 0, ["C4", "D4", "A4"], {"C4": 1, "D4": 1, "A4": 1});
    expect(chord.tones.length).toEqual(3);
    expect(chord.tones[0].name).toEqual("synth1.Chord.sine.C4.Tone");
    expect(chord.tones[1].name).toEqual("synth1.Chord.sine.D4.Tone");
    expect(chord.tones[2].name).toEqual("synth1.Chord.sine.A4.Tone");
  });

  it("the tones are not automatically connected", ()=> {
    const ctx = new mockCtx();
    const chord = new Chord(ctx, "synth1", "sine", .01, 0, ["C4", "D4", "A4"], {"C4": 1, "D4": 1, "A4": 1});
    expect(chord.tones[0].connected).toEqual(false);
    expect(chord.tones[1].connected).toEqual(false);
    expect(chord.tones[2].connected).toEqual(false);
    expect(chord.connected).toEqual(false);
  });

  it("calling connect on the chord connects all the tones", ()=> {
    const ctx = new mockCtx();
    const chord = new Chord(ctx, "synth1", "sine", .01, 0, ["C4", "D4", "A4"], {"C4": 1, "D4": 1, "A4": 1});
    expect(chord.tones[0].connected).toEqual(false);
    expect(chord.tones[1].connected).toEqual(false);
    expect(chord.tones[2].connected).toEqual(false);
    expect(chord.connected).toEqual(false);

    chord.connect();
    expect(chord.tones[0].connected).toEqual(true);
    expect(chord.tones[1].connected).toEqual(true);
    expect(chord.tones[2].connected).toEqual(true);
    expect(chord.connected).toEqual(true);
  });

  it("calling disconnect on the chord connects all the tones", ()=> {
    const ctx = new mockCtx();
    const chord = new Chord(ctx, "synth1", "sine", .01, 0, ["C4", "D4", "A4"], {"C4": 1, "D4": 1, "A4": 1});
    expect(chord.tones[0].connected).toEqual(false);
    expect(chord.tones[1].connected).toEqual(false);
    expect(chord.tones[2].connected).toEqual(false);
    expect(chord.connected).toEqual(false);

    chord.connect();
    expect(chord.tones[0].connected).toEqual(true);
    expect(chord.tones[1].connected).toEqual(true);
    expect(chord.tones[2].connected).toEqual(true);
    expect(chord.connected).toEqual(true);

    chord.disconnect();
    expect(chord.tones[0].connected).toEqual(false);
    expect(chord.tones[1].connected).toEqual(false);
    expect(chord.tones[2].connected).toEqual(false);
    expect(chord.connected).toEqual(false);
  });
});
