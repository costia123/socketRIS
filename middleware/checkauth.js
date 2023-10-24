// ? /\ NPM Package /\
var jwt = require("jsonwebtoken");

// ? /\ Config /\
require('dotenv').config({ path: './../.env' });

// ? /\ Check Auth token /\
module.exports = (req, res, next) => {
	try {
		const token = req.params.token;
		const decoded = jwt.verify(token, process.env.JWT_PWD);
		req.userData = decoded;
		if (req.id === req.userData.id) {
			next();
		}
	} catch (error) {

		return res.status(401).json({
			message: "Authentication failed"
		});
	}
};
