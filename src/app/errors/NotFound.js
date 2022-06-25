class NotFound extends Error {
  constructor(field) {
    super();
    this.errorStatus = 404;
    this.name = 'Not Found';
    this.message = `${field} not found`;
  }
}

module.exports = NotFound;
