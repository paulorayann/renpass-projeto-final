const Person = require('../../src/app/schema/PersonSchema');

module.exports = () => {
    return Promise.all(
        Object.keys(Person.model).map((key) => {
            return Person.model[key].destroy({
                truncate: true,
                force: true
            });
        })
    );
};
