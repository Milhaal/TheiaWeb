import React, { useState } from 'react';
import Axios from 'axios';
import { db } from '../../firebase/firebaseConfig';
import './styled.scss';

const ContactForm = () => {
  const [formData, setFormData] = useState({});

  const updateInput = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    sendEmail();
    setFormData({
      Nom: '',
      Prenom: '',
      email: '',
      telephone: '',
      societe: '',
      sujet: '',
      message: '',
    });
  };

  const sendEmail = () => {
    Axios.post(
      'https://us-central1-formtheia.cloudfunctions.net/submit',
      formData
    )
      .then(res => {
        db.collection('emails').add({
          Nom: formData.Nom,
          prenom: formData.Prenom,
          email: formData.email,
          telephone: formData.telephone,
          societe: formData.societe,
          sujet: formData.sujet,
          message: formData.message,
          time: new Date(),
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Nom"
          placeholder="Nom"
          onChange={updateInput}
          value={formData.Nom || ''}
        />
        <input
          type="text"
          name="Prenom"
          placeholder="Prenom"
          onChange={updateInput}
          value={formData.Prenom || ''}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={updateInput}
          value={formData.email || ''}
        />
        <input
          type="text"
          name="telephone"
          placeholder="Telephone"
          onChange={updateInput}
          value={formData.telephone || ''}
        />
        <input
          type="text"
          name="societe"
          placeholder="Societe"
          onChange={updateInput}
          value={formData.societe || ''}
        />
        <input
          type="text"
          name="sujet"
          placeholder="Sujet"
          onChange={updateInput}
          value={formData.sujet || ''}
        />
        <textarea
          type="text"
          name="message"
          placeholder="Votre message"
          onChange={updateInput}
          value={formData.message || ''}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default ContactForm;
