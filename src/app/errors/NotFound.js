class NotFound extends Error {
    constructor(id) {
        super();
        this.errorStatus = 404;
        this.name = 'NotFound';
        this.message = `Id '${id}' not found`;
    }
}

module.exports = NotFound;
