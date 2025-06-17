import React from 'react'
import HeroSection from './LandingPageSection/heroSection';
import "./landingPage.css";
import ChooseUsSection from './LandingPageSection/chooseUsSection';
import DigitalJourneySection from './LandingPageSection/digitalJourneySection';
import HowItWorks from './LandingPageSection/howItWorks';


const LandingPage = () => {
  return (
    <>
    <div className='container py-4 px-0'>
        <HeroSection/>
        <DigitalJourneySection/>
        <ChooseUsSection/>
        <HowItWorks/>
    </div>
    </>
  )
}

export default LandingPage