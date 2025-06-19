import React from 'react'
import HeroSection from './LandingPageSection/heroSection';
import "./landingPage.css";
import ChooseUsSection from './LandingPageSection/chooseUsSection';
import DigitalJourneySection from './LandingPageSection/digitalJourneySection';
import HowItWorks from './LandingPageSection/howItWorks';
import Footer from '../components/common/footer';
import LandingNavbar from '../components/common/landing-navbar';


const LandingPage = () => {
  return (
    <>
    <div className='landing-bg '>
    <div className='container  px-md-0 px-3'>
      <LandingNavbar/>
        <HeroSection/>
        <DigitalJourneySection/>
        <ChooseUsSection/>
        <HowItWorks/>
        <Footer/>
    </div>
    </div>
    </>
  )
}

export default LandingPage