import React from 'react'
import axios from 'axios'
import {pageTitle} from '../config/styles'
import Form from './Form'

export default function Login() {
  
  const login = {
    submitMsg: "Login",
    inputs: [
      {name: 'credential', type: 'text', placeholder: 'Enter A Email Or Username'},
      {name: 'password', type: 'password', placeholder: 'Enter A Password'},
    ],
    submitFunc: (formData) => {
      axios.post('http://localhost:4000/users/login')
      .then( res => {

        alert('You are logged in')

      })
      .catch( err =>  {
        const message = err.message;
        alert(message)
      })

    }
  }

  return (
    <div id='login'>
      <h1
        style={{...pageTitle}}
      >
        Login
      </h1>

      <Form inputs={login.inputs} submitMsg={login.submitMsg} submitFunc={login.submitFunc} />
    </div>
  )
}
