import React from 'react'
import Button from './button'
import { NAVBAR_LOGO } from '../../utils/app-image-constant'
import { ROUTES } from '../../hooks/routes/routes-constant'
import { useNavigate } from 'react-router-dom'

const LandingNavbar = () => {
      const navigate = useNavigate();
  return (
    <div className='py-md-4 py-2'>
        <div className='top-white-section '>
          <div className=' display-align justify-content-between'>
             <img src={NAVBAR_LOGO} alt="Logo" className='navbarlogo' width="200px" />
              <Button label='Login' className="rounded-3" onClick={() => navigate(ROUTES?.LOGIN)} />
      
          </div>
          <div>

          </div>
        </div>
    </div>
  )
}

export default LandingNavbar
