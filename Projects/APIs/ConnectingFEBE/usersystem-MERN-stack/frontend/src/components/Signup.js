import React from 'react'
import axios from 'axios'
import {pageTitle} from '../config/styles'
import Form from './Form'

export default function Signup() {
  
  const signup = {
    submitMsg: "Sign Up",
    inputs: [
      {name: 'username', type: 'text', placeholder: 'Enter A Username'},
      {name: 'email', type: 'text', placeholder: 'Enter Your Email'},
      {name: 'password', type: 'password', placeholder: 'Enter A Password'},
    ],
    submitFunc: (formData) => {
      axios.post('http://localhost:4000/users/signup', formData)
      .then( res => {

        alert('Your new account was created')

      })
      .catch( err =>  {
        const message = err.message;
        alert(message)
      })

    }
  }

  return (
    <div id='signup'>
      <h1
        style={{...pageTitle}}
      >
        Signup
      </h1>

      <Form inputs={signup.inputs} submitMsg={signup.submitMsg} submitFunc={signup.submitFunc} />
    </div>
  )
}
