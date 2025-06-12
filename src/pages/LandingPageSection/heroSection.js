import React from 'react'
import "../landingPage.css"
import { ARROW_ICON, COMPANY_LOGO, LANDING_IMAGE_1, LANDING_IMAGE_2, } from '../../utils/app-image-constant';
import Button from '../../components/common/button';
import { Amplify } from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExport from '../../aws-export';
// Amplify.configure(awsExport);

const HeroSection = () => {
  return (
    <>
      {/* <Authenticator></Authenticator> */}
    
      <div className='hero-section'>

        <div className='top-white-section'>
          <div className='row align-items-md-center'>
            <div className='col-6 col-md-6 col-sm-12'>
              <img src={COMPANY_LOGO} alt="Logo" />
            </div>
            <div className='col-6 col-md-6 col-sm-12 text-end'>
              <Button label='Login' />
            </div>
          </div>
          <div>

          </div>
        </div>
        <div className='content-section py-4'>
          <h1 className='text-lg'>Secure Every Image.</h1>
          <h1 className='text-lg'>Safeguard Every Insight.</h1>
          <p className='para'>In the real of creativity, technology has become a powerful ally for artists, writers, designers, and creators of all kinds. Artficially intelligent (AI) tools have emarged as valuable companions, assisting naturally creative humans in their creative processes. </p>
        </div>
        {/* <div className='img-section'> */}
        <div className='row'>
          <div className='col-7'>
            <img src={LANDING_IMAGE_1} alt="image" width="100%" height="100%" />
          </div>
          <div className='col-5'>
            <img src={LANDING_IMAGE_2} alt="image" width="100%" height="65%" className='mb-2' />
            <Button label="Try Now" icon={ARROW_ICON} className="tryNowButton" />
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default HeroSection