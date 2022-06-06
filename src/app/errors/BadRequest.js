class BadRequest extends Error {
    constructor(field) {
        super();
        this.errorStatus = 400;
        this.name = 'BadRequest';
        this.message = `${field} `;
    }
}

module.exports = BadRequest;
