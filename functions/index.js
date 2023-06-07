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
      text: `Info \n\n Nom du client : ${contactData.surname}${contactData.name},\n\n Email : ${contactData.email}\n\n Téléphone : ${contactData.phone}\n\n Compagny/Entreprise du client : ${contactData.company} \n\n Sujet du message : ${contactData.subject} \n\n Contenu du message envoyé : ${contactData.message}`,
      html: `<p> Info <br><br> Nom du client : ${contactData.surname}${contactData.name},<br><br>Email : ${contactData.email}<br><br>Téléphone : ${contactData.phone}<br><br> Compagny/Entreprise du client : ${contactData.company} <br><br> Sujet du message : ${contactData.subject} <br><br> Contenu du message envoyé : ${contactData.message}</p>`
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
