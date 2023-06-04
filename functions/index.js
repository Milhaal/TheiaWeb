const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");

const firebaseConfig = {
  apiKey: "AIzaSyDB4BfdCWo9fHb4rC2YZl5gOgtikxQHi5g",
  authDomain: "formtheia.firebaseapp.com",
  databaseURL: "https://formtheia-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "formtheia",
  storageBucket: "formtheia.appspot.com",
  messagingSenderId: "335132907653",
  appId: "1:335132907653:web:d4620962ca0a24131571ec"
};

admin.initializeApp(firebaseConfig);
const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "theiaweb.contact@gmail.com",
    pass: "GC!4ever*",
  },
});

app.post("/formtheia/us-central1/sendMailOverHTTP", async (req, res) => {
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

// Configure CORS options
const corsOptions = {
  origin: true, // Allow all origins
};

// Enable CORS for the Cloud Function
app.use(cors(corsOptions));
exports.testEndpoint = functions.https.onRequest((req, res) => {
  res.send('Test endpoint');
});

// Export the Cloud Function
exports.sendMailOverHTTP = functions.https.onRequest(app);
