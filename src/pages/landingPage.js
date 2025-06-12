import React from 'react'
import HeroSection from './LandingPageSection/heroSection';
import "./landingPage.css";
import ChooseUsSection from './LandingPageSection/chooseUsSection';


const LandingPage = () => {
  return (
    <>
    <div className='container py-4 px-0'>
        <HeroSection/>
        <ChooseUsSection/>
    </div>
    </>
  )
}

export default LandingPage