const express = require('express');
const cors = require('cors');
const router = require('./router');
const methodOverride = require('method-override');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use('/v1/items', router);
app.use(methodOverride())
app.use((err, req, res, next) => {
    const code = err.code ? err.code : 400;
    res.status(code);
    res.json({ error: err.message });
});

module.exports = (req, res) => {
    return app(req, res);
};