class Context {
  constructor(ctxClass, name) {
    this.ctx = new ctxClass();
    this.name = name;
  }
}

module.exports = Context;
