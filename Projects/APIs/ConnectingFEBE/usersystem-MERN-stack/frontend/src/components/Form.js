import React, { useState } from 'react'
import {defaultNavBtn} from '../config/styles'

export default function Form(props) {

  const {inputs, submitMsg, submitFunc} = props;

  const initalState = {};

  inputs.forEach( input => {
    initalState[input.name] = ""
  });

  const [formData, setFormData] = useState(initalState)

  const inputOnChange = (evnt) => {
    setFormData({...formData, [evnt.target.name]: evnt.target.value})
  }

  const renderInputs = () => {
    return inputs.map( (input, idx) => {
      return (
        <input
          key={idx}
          name={input.name}
          type={input.type}
          placeholder={input.placeholder}
          value={formData[input.name]}
          onChange={inputOnChange}
        />
      )
    })
  }

  return (
    <div>
      <form>
        {renderInputs()}
      </form>
      <button
        style={{...defaultNavBtn}}
        onClick={() => {submitFunc(formData)}}
      >
        {submitMsg || 'Submit'}
      </button>
    </div>
  )
}
