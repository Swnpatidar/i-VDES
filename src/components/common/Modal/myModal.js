import React from 'react'
import Button from '../button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../hooks/routes/routes-constant';

const MyModal = ({ isOpen, onClose, icon, heading, subHeading, isButton = false }) => {
    console.log("isOpen=>", isOpen)
    console.log("onClose=>", onClose)
    const navigate = useNavigate()
    return (
        <>
            <div className='set-center flex-column'>
                {icon && <img src={icon} className="mb-2" alt="authorization-image" width="25%" />}
                {heading && <h3 className='text-white'>{heading}</h3>}
                {subHeading && <p className=''>{subHeading}</p>}
                {isButton && <div className='mt-3 '>
                    <Button label="Cancel" className="mx-1 px-5 py-2 modal-btn-close rounded-3" onClick={onClose} />
                    <Button label="Yes, Logout!" className="mx-1 px-4 py-2 modal-btn-logout rounded-3 " onClick={() => navigate(ROUTES?.LOGIN)} />
                </div>}
            </div>
        </>
    );
}

export default MyModal;