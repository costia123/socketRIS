
// ? /\ mailer Package /\
const nodemailer = require('nodemailer');

// ? /\ Mail serveur configuration /\
module.exports = nodemailer.createTransport({
    host: "host.email.net",
    port: 465,
    secure: true,
    tls: { rejectUnauthorized: false },
    auth: {
      user: "email@emxemple.com",
      pass: "passof ur email"
    }
  });