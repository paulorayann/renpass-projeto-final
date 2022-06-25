class Unauthorized extends Error {
  constructor(field) {
    super();
    this.errorStatus = 401;
    this.name = 'Unauthorized';
    this.message = `${field}`;
  }
}

module.exports = Unauthorized;
