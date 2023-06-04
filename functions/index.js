const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

exports.sendEmailToUser = functions.firestore
  .document('contacts/{contactId}')
  .onCreate((snapshot, context) => {
    const contactData = snapshot.data();

    // Configure the email transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'theiaweb.contact@gmail.com',
        pass: 'cwsmnseyqepnqplf'
      }
    });

    const mailOptions = {
      from: 'theiaweb.contact@gmail.com',
      to: contactData.email,
      subject: 'Thank you for contacting us',
      text: `Dear ${contactData.name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nYour Company`,
      html: `<p>Dear ${contactData.name},</p>
        <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Your Company</p>`
    };

    return transporter.sendMail(mailOptions)
      .then(() => {
        console.log('Email sent to user');
        return null;
      })
      .catch((error) => {
        console.error('Error sending email to user:', error);
        return null;
      });
  });
