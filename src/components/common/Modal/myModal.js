import React from 'react'
import Button from '../button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../hooks/routes/routes-constant';
import { signOut } from '@aws-amplify/auth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { clearAmplifyAuthSession } from '../../../hooks/redux/slice/auth-session';

const MyModal = ({ isOpen, onClose, icon, heading, subHeading, isButton = false }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Amplify Logout to clear session
    const logoutUser = async (dispatch) => {
        try {
            await signOut({ global: true });  // `global: true` signs out from all devices
            dispatch(clearAmplifyAuthSession())
            navigate(ROUTES?.LOGIN)
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const handleLogoutConfirm = () => {
        logoutUser(dispatch) //function to logout user
        localStorage.removeItem('persist:root');
        localStorage.clear();
        onClose()
    }
    return (
        <>
            <div className='set-center flex-column'>
                {icon && <img src={icon} className="mb-2" alt="authorization-image" width="25%" />}
                {heading && <h3 className='text-white mymodal-heading'>{heading}</h3>}
                {subHeading && <p className='mymodal-subheading'>{subHeading}</p>}
                {isButton && <div className='mt-3 '>
                    <Button label="Cancel" className="mx-1 px-5 py-2 modal-btn-close rounded-3" onClick={onClose} />
                    <Button label="Yes, Logout!" className="mx-1 px-4 py-2 modal-btn-logout rounded-3 " onClick={handleLogoutConfirm} />
                </div>}
            </div>
        </>
    );
}

export default MyModal;