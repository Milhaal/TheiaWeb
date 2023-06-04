
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
admin.initializeApp();
const app = express();
app.use(cors())
exports.sendMailOverHTTP = functions.https.onRequest(async (req, res) => {
  const { name, email, phone, company, subject, message } = req.body;

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "theiaweb.contact@gmail.com",
      pass: "GC!4ever*",
    },
  });

  // Construct the message
  const mailOptions = {
    from: "theiaweb.contact@gmail.com",
    to: email,
    subject: `${company} represented by ${name} : ${subject}`,
    html: `<p>Name: ${name}</p> <p>Email: ${email}</p> <p>Phone: ${phone}</p> <p>Company: ${company}</p> <p>Message: ${message}</p>`,
  };
  exports.sendMailOverHTTP = functions.https.onRequest(async (req, res) => {
  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
  }); 
});