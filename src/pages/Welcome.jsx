import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LottieAnimation from '../components/LottieAnimation'
import animationData from '../assets/mann.json'
import transitionAnimation from '../assets/transition.json'
import './Welcome.css'

export default function Welcome() {
  const navigate = useNavigate()
  const [showTransition, setShowTransition] = useState(false)

  const handleStart = () => {
    setShowTransition(true)
    setTimeout(() => navigate('/select'), 2500)
  }

  return (
    <div className="landing">
      {showTransition && (
        <div className="transitionScreen">
          <LottieAnimation
            animationData={transitionAnimation}
            loop={false}
            className="transitionLottie"
            placeholderLabel="Transition animation coming soon…"
          />
        </div>
      )}

      <div className="topWave" />
      <div className="bottomLeft" />
      <div className="bottomRight" />
      <div className="dotGrid topDots" />
      <div className="dotGrid bottomDots" />

      <div className="hero">
        <div className="logoSection">
          <img src="/NObg.png" alt="MAARGAM logo" className="mainLogo" />
        </div>

        <div className="animationSection">
          <LottieAnimation
            animationData={animationData}
            loop
            className="walkingAnimation"
            placeholderLabel="Welcome animation coming soon…"
          />
        </div>

        <button
          className="startBtn"
          onClick={handleStart}
          style={{ pointerEvents: showTransition ? 'none' : 'auto' }}
        >
          Get Started
          <span className="arrow">›</span>
        </button>
      </div>
    </div>
  )
}
