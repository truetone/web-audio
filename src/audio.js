class Audio {
    audioSupported() {
        return typeof AudioContext == "function"
    }

    createContext() {
        return new AudioContext();
    }
}

module.exports = Audio;
