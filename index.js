const app = require('./app');

exports.note = (req, res) => {
    return app(req, res);
};

