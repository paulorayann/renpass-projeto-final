class BadRequest extends Error {
  constructor(field) {
    super();
    this.errorStatus = 400;
    this.name = 'Bad Request';
    this.message = `${field}`;
  }
}

module.exports = BadRequest;
