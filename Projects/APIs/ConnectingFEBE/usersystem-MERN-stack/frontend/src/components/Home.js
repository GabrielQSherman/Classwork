import React from 'react'
import {pageTitle} from '../config/styles'

export default function Home() {
  return (
    <div id='home'>
      <h1
        style={{...pageTitle}}
      >
        Welcome To Our Site
      </h1>
    </div>
  )
}
