const functions = require('firebase-functions');
const admin = require("firebase-admin");
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');

admin.initializeApp();
const app = express();
app.use(cors());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'theiaweb.contact@gmail.com',
    pass: 'emdoslhfiwbudwpj'
  }
});

app.post('/sendMailOverHTTP', (req, res) => {
  const { email, name, phone, message, sujet } = req.body;

  const mailOptions = {
    from: email,
    to: 'theiaweb.contact@gmail.com',
    subject: 'Email From Me to MySelf | Contact Form Message',
    html: `<h1>Contact Form Message</h1>
      <p>
        <b>Email: </b>${email}<br>
        <b>Name: </b>${name}<br>
        <b>Mobile: </b>${phone}<br>
        <b>Message: </b>${message}<br>
        <b>Sujet: </b>${sujet}<br>
      </p>`
  };

  transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
      return res.send(error.toString());
    }

    const responseData = JSON.stringify(data);
    return res.send(`Sent! ${responseData}`);
  });
});

exports.sendMailOverHTTP = functions.https.onRequest(app);
