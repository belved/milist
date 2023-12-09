const errorPrototype = {
  getMessage() {
    return this.message;
  }
};

function Error(message) {
  this.message = message;
}

Object.assign(Error.prototype, errorPrototype);

export default Error;