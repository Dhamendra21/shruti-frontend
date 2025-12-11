
import React from 'react'
import { Routes, Route as RouterRoute } from 'react-router-dom'

import Home from '../home/Home'

import About from '../pages/About'
import SignToText from '../livetranslate/TranslatePage'
import TextToSignPage from '../TextToSign/TextToSign'
import TrainSignPage from '../pages/TrainCustomWord'
import TrainCustomSignPage from '../pages/TrainCustomSign'

const Route = () => {
  return (
    <>
      <Routes>
        <RouterRoute path="/" element={<Home />} />
        <RouterRoute path="/sign-to-text" element={<SignToText />} />
        <RouterRoute path="/about" element={<About />} />
        <RouterRoute path="/text-to-sign" element={<TextToSignPage />} />
        <RouterRoute path="/add-signs" element={<TrainSignPage />} />
        <RouterRoute path="/train-custom-sign" element={<TrainCustomSignPage />} />
        
      </Routes>
    </>
  )
}

export default Route


