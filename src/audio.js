class Audio {
  constructor(name) {
    this.name = name;
    this.ctx = this.createContext();
  }

  audioSupported() {
    return typeof AudioContext == "function"
  }

  createContext() {
    return new (window.AudioContext || window.webkitAudioContext)();
  }
}

module.exports = Audio;
