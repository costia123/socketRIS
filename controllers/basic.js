var jwt = require('jsonwebtoken')
const bycrypt = require("bcryptjs");
const checkAuth = require("../middleware/checkauth");


module.exports = function (app) {


    app.get('/api/img/:id', async function (req, res) {
        res.header('Cross-Origin-Resource-Policy', 'cross-origin')
        res.sendFile(req.params.id, { root: "path/to/your/image/folder" });
    })

}