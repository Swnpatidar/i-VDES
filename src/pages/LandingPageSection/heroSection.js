import React from 'react'
import "../landingPage.css"
import { ARROW_ICON, LANDING_IMAGE_1, LANDING_IMAGE_2, NAVBAR_LOGO, } from '../../utils/app-image-constant';
import Button from '../../components/common/button';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../hooks/routes/routes-constant';
// Amplify.configure(awsExport);

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* <Authenticator></Authenticator> */}

      <div className='hero-section mb-4'>
        <div className='top-white-section'>
          <div className='row align-items-md-center'>
            <div className='col-6 col-md-6 col-sm-12'>
              <img src={NAVBAR_LOGO} alt="Logo" />
            </div>
            <div className='col-6 col-md-6 col-sm-12 text-end'>
              <Button label='Login' onClick={() => navigate(ROUTES?.LOGIN)} />
            </div>
          </div>
          <div>

          </div>
        </div>
        <div className='content-section py-4'>
          <div className='mb-3'>
            <h1 className='text-lg'>Secure Every Image.</h1>
            <h1 className='text-lg'>Safeguard Every Insight.</h1>
          </div>
          <p className='para'>In the real of creativity, technology has become a powerful ally for artists, writers, designers, and creators of all kinds. Artficially intelligent (AI) tools have emarged as valuable companions, assisting naturally creative humans in their creative processes. </p>
        </div>
        {/* <div className='img-section'> */}
        <div className='row'>
          <div className='col-12 col-md-7 col-sm-12 mb-3'>
            <img src={LANDING_IMAGE_1} alt="image" width="100%" height="100%" />
          </div>
          <div className='col-12 col-md-5 col-sm-12 mb-3'>
            <div className='imageBox mb-3'>
              <img src={LANDING_IMAGE_2} alt="image" width="100%" height="100%" className='mb-2' />
            </div>
            <Button label="Try Now" icon={ARROW_ICON} className="tryNowButton" iconPosition='back' />
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default HeroSection