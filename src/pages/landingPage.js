import React from 'react'
import HeroSection from './LandingPageSection/heroSection';
import "./landingPage.css";
import LineCharts from '../components/snippets/line-chart';
import Dashboard from './Dashboard';


const LandingPage = () => {
  return (
    <>
    <div className='container py-4 px-0'>
        
        {/* <HeroSection/> */}
        <Dashboard/>
    </div>
    </>
  )
}

export default LandingPage