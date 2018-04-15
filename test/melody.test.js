const Melody = require('../src/melody');


// let mockCtx;
// let mockCreatePanner;
// let mockCreateGain;
// let mockGainConnect;
// let mockCreateOscillator;
// let mockGain;
const melodyConfigs = [
  {
    name: "sine 1",
    type: "sine",
    gain: .1,
    pan: -1,
    chordNotes: ["C4"]
  },
  {
    name: "sine 2",
    type: "sine",
    gain: .1,
    pan: 1,
    chordNotes: ["C4"]
  }
];

// beforeAll(() => {
//   mockCtx = jest.fn();
//   mockCreatePanner = jest.fn();
//   mockCreateGain = jest.fn();
//   mockCreateOscillator = jest.fn();
//   mockGain = jest.fn();
//   mockCreateGain.mockReturnValue({
//     gain: {gain: 0},
//     connect: jest.fn()}
//   );
//   mockCreateOscillator.mockReturnValue({
//     gain: null,
//     start: jest.fn(),
//     frequency: {value: 0}
//   });
//   mockGainConnect = jest.fn();
//   mockCreatePanner.mockReturnValue({});
//
//   mockGain.mockImplementation(() => {
//     return {
//       connect: mockGainConnect
//     }
//   });
//
//   mockGainConnect.mockImplementation(() => {
//     return {
//       connect: mockGainConnect
//     }
//   });
//
//   mockCtx.mockImplementation(() => {
//     return {
//       createPanner: mockCreatePanner,
//       createGain: mockCreateGain,
//       createOscillator: mockCreateOscillator
//     };
//   })
//   .mockName("mockCtx");
// });
//
// beforeEach(() => {
//   mockCtx.mockClear();
//   mockCreatePanner.mockClear();
// });

describe("Melody", () => {
  describe("Melody.play", () => {
    it("sleeps for the expected interval", () => {
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

      const melody = new Melody(mockCtx, melodyConfigs);
  });

  describe("Melody.sleep", () => {
      const start = Date.now();
      Melody.sleep(500);
      const end = Date.now();
      const result = end - start;
      expect(result).toEqual(500);
    });
  });
});
