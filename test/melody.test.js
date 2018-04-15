const Melody = require('../src/melody');


describe("Melody", () => {
  describe("Melody.sleep", () => {
    it("sleeps for the expected interval", () => {
      // const melody = new Melody();
      const start = Date.now();
      Melody.sleep(500);
      const end = Date.now();
      const result = end - start;
      expect(result).toEqual(500);
    });
  });
});
