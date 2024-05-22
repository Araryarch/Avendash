import { NavLink } from 'react-router-dom'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { Typewriter } from 'react-simple-typewriter'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

const Hero = () => {
  const titleRef = useRef(null)
  const buttonRef = useRef(null)
  const descRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, x: -400 },
      { opacity: 1, x: 0, duration: 1.5 },
    )
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, x: -400 },
      { opacity: 1, x: 0, duration: 3 },
    )
    gsap.fromTo(
      descRef.current,
      { opacity: 0, x: 400 },
      { opacity: 1, x: 0, duration: 2 },
    )
  }, [])

  return (
    <div className="box-border min-h-screen w-full">
      <Navbar addClass="fixed top-0 z-10" />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="title text-6xl font-bold xl:text-8xl" ref={titleRef}>
              Avendash<span className="text-primary">.</span>
            </h1>
            <p className="py-6 text-xl" ref={descRef}>
              Simple Mqtt Dashboard with
              <Typewriter
                words={[' ExpressJs.', ' ReactJs.', ' MqttJs.']}
                loop={0}
              />
            </p>
            <NavLink
              ref={buttonRef}
              to="/sensors"
              className="btn btn-primary text-primary-content"
            >
              Get Started
            </NavLink>
          </div>
        </div>
      </div>
      <Footer addClass="" />
    </div>
  )
}

export default Hero
