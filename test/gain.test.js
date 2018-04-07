const Gain = require("../src/gain");

let mockCtx;
let mockGain;
let mockCreateGain;

beforeAll(() => {
  mockCtx = jest.fn();
  mockGain = jest.fn();
  mockCreateGain = jest.fn();
  mockCreateGain.mockReturnValue({
      gain: {gain: 0},
      connect: jest.fn()}
  );
  mockGain.mockImplementation(() => {
    return {
      connect: mockGainConnect
    }
  });

  mockCtx.mockImplementation(() => {
    return {
      createGain: mockCreateGain
    };
  })
  .mockName("mockCtx");
});

describe("creating new Gain instances", () => {
  it("has our expected name", ()=> {
    const ctx = new mockCtx();
    const gain = new Gain(ctx, "synth1", .01);
    expect(gain.name).toEqual("synth1.Gain");
  });
});
