import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Lottie from "lottie-react";

import animationData from "../assets/mann.json";
import transitionAnimation from "../assets/transition.json";

import "./Welcome.css";

function Welcome(){

const navigate = useNavigate();

const [showTransition,setShowTransition] = useState(false);

const handleStart=()=>{

setShowTransition(true);

setTimeout(()=>{

navigate("/select");

},2500);

};

return(

<div className="landing">

{showTransition && (

<div className="transitionScreen">

<Lottie
animationData={transitionAnimation}
loop={false}
className="transitionLottie"
/>

</div>

)}

<div className="topWave"></div>
<div className="bottomLeft"></div>
<div className="bottomRight"></div>

<div className="dotGrid topDots"></div>
<div className="dotGrid bottomDots"></div>

<div className="hero">

<div className="logoSection">

<img
src="/NObg.png"
alt="Logo"
className="mainLogo"
/>

</div>

<div className="animationSection">

<Lottie
animationData={animationData}
loop={true}
className="walkingAnimation"
/>

</div>

<button
  className="startBtn"
  onClick={handleStart}
  style={{ pointerEvents: showTransition ? 'none' : 'auto' }}
>
  📍 Get Started
  <span className="arrow">›</span>
</button>

</div>

</div>

);

}

export default Welcome;