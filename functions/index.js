const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

admin.initializeApp();
const app = express();
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "theiaweb.contact@gmail.com",
    pass: "GC!4ever*",
  },
});

app.post("/sendMailOverHTTP", async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;

    // Construct the message
    const mailOptions = {
      from: "theiaweb.contact@gmail.com",
      to: email,
      subject: `${company} represented by ${name} : ${subject}`,
      html: `<p>Name: ${name}</p> <p>Email: ${email}</p> <p>Phone: ${phone}</p> <p>Company: ${company}</p> <p>Message: ${message}</p>`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Send the response only after the email has been sent
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

exports.sendMailOverHTTP = functions.https.onRequest(app);
