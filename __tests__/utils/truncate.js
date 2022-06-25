const Person = require('../../src/app/schema/PersonSchema');

module.exports = () =>
  Promise.all(
    Object.keys(Person.model).map((key) =>
      Person.model[key].destroy({
        truncate: true,
        force: true
      })
    )
  );
