import React, { useState } from 'react'
import { Axios, db } from '../../firebase/firebaseConfig'
import './styled.scss'

const ContactForm = () => {
  const [formData, setFormData] = useState({})

  const updateInput = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = event => {
    event.preventDefault()
    sendEmail()
    setFormData({
      Nom: '',
      prenom:'',
      email: '',
      telephone:'',
      societe:'',
      sujet:'',
      message: '',
    })
  }
  const sendEmail = () => {
    Axios.post(
      'https://us-central1-formtheia.cloudfunctions.net/submit',
      formData
    )
      .then(res => {
        db.collection('emails').add({
          Nom: formData.Nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
          societe: formData.societe,
          sujet: formData.sujet,
          message: formData.message,
          
          time: new Date(),
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          name="Nom"
          placeholder="Nom"
          onChange={updateInput}
          value={formData.name || ''}
        />     
      <input
          type="text"
          name="Prenom"
          placeholder="Prenom"
          onChange={updateInput}
          value={formData.name || ''}
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
          value={formData.message || ''}
        ></input>
        <input
          type="text"
          name="Societe"
          placeholder="Societe"
          onChange={updateInput}
          value={formData.message || ''}
        ></input>
        <input
          type="text"
          name="sujet"
          placeholder="Sujet"
          onChange={updateInput}
          value={formData.message || ''}
        ></input>
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
  )
}