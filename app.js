// ? /\ App /\
const express = require("express");

// ? /\ Other Package /\
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require("cors");

// ? /\ Set App = express serveur /\
const app = express();

// ? /\ BodyParser configurations /\
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ? /\ Cors /\
app.options('*', cors());
app.use(cors({origin: '*'}));

// ? /\ Inculde Images /\
app.use("./../image", express.static("image"));



app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// ? /\ All Controllers /\
var apiControllersBasic = require("./controllers/basic");



// ? /\ Run All Controllers /\
apiControllersBasic(app);



// ? /\ Start serveur /\
app.listen(process.env.PORT || 8080, () => {
    console.log("\x1b[34m", "server is running 👍", "\x1b[37m")
});