class NoContent extends Error {
  constructor(field) {
    super();
    this.errorStatus = 401;
    this.name = 'No Content';
    this.message = `${field}`;
  }
}

module.exports = NoContent;
