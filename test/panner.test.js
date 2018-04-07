const Panner = require("../src/panner");

let mockCtx;
let mockCreatePanner;

beforeAll(() => {
  mockCtx = jest.fn();
  mockCreatePanner = jest.fn();
  mockCreatePanner.mockReturnValue({});
  mockCtx.mockImplementation(() => {
    return {
      createPanner: mockCreatePanner
    };
  })
  .mockName("mockCtx");
});

describe("creating new Panner instances", () => {
  it("has our expected name", ()=> {
    const ctx = new mockCtx();
    const panner = new Panner(ctx, "synth1", .01);
    expect(panner.name).toEqual("synth1.Panner");
  });
});
