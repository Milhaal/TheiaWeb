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
      subject: 'Merci pour votre prise de contact',
      text: `Chèr(e) ${contactData.name},\n\nThank you for reaching out to us. We have received your message and will get back to you as soon as possible.\n\nBest regards,\nYour Company`,
      html: `<p>Dear ${contactData.name},</p>
        <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Your Company</p>`
    };

    const mailAdmin = {
      from: 'theiaweb.contact@gmail.com',
      to: 'theiaweb.contact@gmail.com',
      subject: 'Info client',
      text: `Info ${contactData.surname}${contactData.name},\n ${contactData.email}\n ${contactData.phone}\n ${contactData.phone}\n ${contactData.company} \n\n ${contactData.subject} \n \n${contactData.message}`,
      html: `<p> Info ${contactData.surname}${contactData.name},\n ${contactData.email}\n ${contactData.phone}\n ${contactData.phone}\n ${contactData.company} \n\n ${contactData.subject} \n \n${contactData.message}</p>`
    };

    const sendMailToUser = transporter.sendMail(mailOptions);
    const sendMailToAdmin = transporter.sendMail(mailAdmin);

    return Promise.all([sendMailToUser, sendMailToAdmin])
      .then(() => {
        console.log('Emails sent successfully');
        return null;
      })
      .catch((error) => {
        console.error('Error sending emails:', error);
        return null;
      });
  });
