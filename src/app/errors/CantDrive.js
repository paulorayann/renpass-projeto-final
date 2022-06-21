class CantDrive extends Error {
    constructor(user) {
        super();
        this.name = `Can't drive`;
        this.message = `User '${user}' can't drive`;
    }
}

module.exports = CantDrive;
