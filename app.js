const express = require("express");
const http = require("http"); // Importez le module http
const socketIo = require("socket.io");

const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
const server = http.createServer(app); // Créez un serveur HTTP en utilisant Express
const io = socketIo(server, {  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }}); // Attachez Socket.io au serveur HTTP

// ... Vos configurations bodyParser et CORS ici ...

// Incluez des images
app.use("/image", express.static("image"));
app.options('*', cors());
app.use(cors({origin: '*'}));
app.use(function (req, res, next) {
  // Configuration CORS
  // ...

  // Passez à la couche middleware suivante
  next();
});

function postMessage (username, message, token, role ){
    console.log(token)
    axios.post('https://ris.costiadevelopmentagency.fr/api/messages', {
        data: {
            username: username,
            message: message,
            role: role
          },
        
    },{
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
    }).catch(err => console.log(err))
}
// ... Vos contrôleurs et routes ...

// Écoutez les connexions WebSocket
io.on("connection", async (socket) => {
    console.log("Un client est connecté via WebSocket:", socket.id);
  
    // Récupérez les anciens messages depuis votre source de stockage (par exemple, une base de données)
    try {
        axios.get('https://ris.costiadevelopmentagency.fr/api/messages')
          .then((res) => {
              res.data.data.map((itm) => {
                console.log(itm)
                socket.emit("chat message", itm.attributes.username, itm.attributes.message, itm.attributes.role);
              });
          });
      } catch (error) {
        console.error("Erreur lors de la récupération des anciens messages:", error);
      }
  
    // Gérez les événements WebSocket ici
    socket.on("chat message", (username, message, token, role) => {
      console.log(username, message);
      postMessage(username, message, token, role)
      io.emit("chat message", username, message, role); // Diffusez le message à tous les clients connectés

      
    });
  });
  

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("\x1b[34m", "Serveur is running 👍", "\x1b[37m");
});