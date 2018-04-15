const Melody = require('../src/melody');

const melodyConfigs = [
  {
    name: "sine 1",
    type: "sine",
    gain: .1,
    pan: -1,
    chordNotes: ["C4", "D4", "E4"]
  }
];

describe("Melody", () => {
  describe("Melody.play", () => {
    it("stops the melody loop if we call stop()", () => {
      const mockCtx = jest.fn();
      const mockCreatePanner = jest.fn();
      const mockCreateGain = jest.fn();
      const mockCreateOscillator = jest.fn();
      const mockGain = jest.fn();
      const mockGainConnect = jest.fn();
      mockCreateGain.mockReturnValue({
        gain: {gain: 0},
        connect: jest.fn()}
      );
      mockCreateOscillator.mockReturnValue({
        gain: null,
        start: jest.fn(),
        frequency: {value: 0}
      });
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

      jest.mock("../src/melody");
      const mockMelody = new Melody(mockCtx, melodyConfigs, 100);
      mockMelody.play();
      expect(mockMelody.stopped).toEqual(false);
      mockMelody.stop();
      expect(mockMelody.stopped).toEqual(true);
    });
  });
});
