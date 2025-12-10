
import React from 'react'
import { Routes, Route as RouterRoute } from 'react-router-dom'

import Home from '../home/Home'

import About from '../pages/About'
import SignToText from '../livetranslate/TranslatePage'
import TextToSignPage from '../TextToSign/TextToSign'

const Route = () => {
  return (
    <>
      <Routes>
        <RouterRoute path="/" element={<Home />} />
        <RouterRoute path="/sign-to-text" element={<SignToText />} />
        <RouterRoute path="/about" element={<About />} />
        <RouterRoute path="/text-to-sign" element={<TextToSignPage />} />

      </Routes>
    </>
  )
}

export default Route


