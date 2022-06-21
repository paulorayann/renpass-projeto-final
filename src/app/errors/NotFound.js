class NotFound extends Error {
    constructor(field) {
        super();
        this.name = 'Not Found';
        this.message = `'${field}' not found`;
    }
}

module.exports = NotFound;
