const GenericModel = require('./genericModel');

class DummyAssetsModel extends GenericModel {
    constructor() {
        super('assets'); // 'assets' is the table name
    }
}

module.exports = new DummyAssetsModel();