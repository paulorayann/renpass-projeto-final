class InvalidField extends Error {
    constructor(field) {
        super();
        this.errorStatus = 404;
        this.name = 'NotFound';
        this.message = `The field '${field}' is invalid`;
    }
}

module.exports = InvalidField;
