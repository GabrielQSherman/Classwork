import React, { useState } from 'react'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import buttonConfig from '../config/navButtonsConfig'
import {defaultNavBtn} from '../config/styles'

export default function Navigation() {

  const [page, setPage] = useState('home')

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home />
      case 'login':
        return <Login />
      case 'signup':
        return <Signup />
      default:
        return "404 Page Not Defined";
    }
  }

  const renderButtons = () => {

    return buttonConfig.map( btn => {
      
      // console.log(btn);
      
      if (btn.page === page) 
        return null
      else {
        return (
          <button
            style = {{...defaultNavBtn, color: btn.color}}
            onClick = {() => {setPage(btn.page)}}
          >
            {btn.text}
          </button>
        )
      }
    })
  
  }

  return (
    <div id='nav'>
      {renderPage()}
      {renderButtons()}
    </div>
  )
}


