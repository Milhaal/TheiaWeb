const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require("cors");
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();
const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "theiaweb.contact@gmail.com",
    pass: "GC4*EVER!",
  },
});

app.post(
  "/formtheia/us-central1/sendMailOverHTTP",
  async (req, res) => {
    try {
      const { name, email, phone, company, subject, message } = req.body;

      // Construct the message
      const mailOptions = {
        from: "theiaweb.contact@gmail.com",
        to: email,
        subject: `${company} represented by ${name} : ${subject}`,
        html: `<p>Name: ${name}</p> 
              <p>Email: ${email}</p> 
              <p>Phone: ${phone}</p> 
              <p>Company: ${company}</p> 
              <p>Message: ${message}</p>`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // Send the response only after the email has been sent
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    }
  }
);
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


