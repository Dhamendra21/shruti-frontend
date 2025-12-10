import React from 'react'
import { Hero } from './hero'
import { Services } from './Service'
import { Features } from '../keyFeatures'
import { Mission } from './Mision'
import { Footer } from './Footer'

const Home = () => {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Hero />
      <Services />
      <Features />
      <Mission />
      <Footer />
    </div>
    </>
  )
}

export default Home