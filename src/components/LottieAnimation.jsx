import Lottie from 'lottie-react'
import './LottieAnimation.css'

/**
 * Renders a Lottie animation when data is available,
 * otherwise shows a lightweight animated placeholder.
 */
export default function LottieAnimation({
  animationData,
  loop = true,
  className = '',
  placeholderLabel = 'Animation loading…',
}) {
  if (!animationData) {
    return (
      <div className={`lottie-placeholder ${className}`} aria-label={placeholderLabel}>
        <div className="lottie-placeholder-figure">
          <span className="lottie-placeholder-head" />
          <span className="lottie-placeholder-body" />
          <span className="lottie-placeholder-legs" />
        </div>
        <p>{placeholderLabel}</p>
      </div>
    )
  }

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      className={className}
    />
  )
}
