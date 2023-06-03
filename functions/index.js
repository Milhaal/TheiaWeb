const { onRequest } = require("firebase-functions");
const logger = require("firebase-functions/logger");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");

const functions = require('firebase-functions');
const admin = require("firebase-admin");
const nodemailer = require('nodemailer');

admin.initializeApp();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'theiaweb.contact@gmail.com',
    pass: 'xyvbkwpaqcklagxs'
  }
});

exports.sendMailOverHTTP = functions.https.onRequest((req, res) => {
  const mailOptions = {
    from: `vinc.charles0@gmail.com`,
    to: `theiaweb.contact@gmail.com`,
    subject: 'Email From Me to MySelf | Contact Form Message',
    html: `<h1>Contact Form Message</h1>
      <p>
        <b>Email: </b>${req.body.email}<br>
        <b>Name: </b>${req.body.name}<br>
        <b>Mobile: </b>${req.body.name}<br>
        <b>Message: </b>${req.body.message}<br>
      </p>`
  };

  transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
      return res.send(error.toString());
    }

    const responseData = JSON.stringify(data);
    return res.send(`Sent! ${responseData}`);
  });

  const leadName = req.body.name;
  const leadEmail = req.body.email;
  const leadMobile = req.body.phone;
  const leadMessage = req.body.message;

  const settings = {
    url: "http://127.0.0.1:5001/formtheia/us-central1/sendMailOverHTTP",
    method: "POST",
    timeout: 0,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      name: leadName,
      email: leadEmail,
      mobile: leadMobile,
      message: leadMessage
    }
  };

  // Make sure to handle the AJAX request properly, as this code assumes the presence of the "$" function for AJAX.
  // Modify this code to match your specific implementation.
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
});
