import React from 'react';
import {
    WHYWECHOOSE_IMAGE,
    WHYWECHOOSE_IMAGE1,
    WHYWECHOOSE_IMAGE2,
    WHYWECHOOSE_IMAGE3,
    WHYWECHOOSE_IMAGE4,
    WHYWECHOOSE_IMAGE5,
    WHYWECHOOSE_IMAGE6,
    WHYWECHOOSE_IMAGE7,
    WHYWECHOOSE_IMAGE8
} from '../../utils/app-image-constant';

const leftData = [
    { Name: "Unmatched Performance", Image: WHYWECHOOSE_IMAGE1 },
    { Name: "Enhanced Security", Image: WHYWECHOOSE_IMAGE2 },
    { Name: "Regulatory Compliance", Image: WHYWECHOOSE_IMAGE3 },
    { Name: "Future-Proof Technology", Image: WHYWECHOOSE_IMAGE4 }
];

const rightData = [
    { Name: "Future-Proof Technology", Image: WHYWECHOOSE_IMAGE7 },
    { Name: "Cost Efficiency", Image: WHYWECHOOSE_IMAGE6 },
    { Name: "Comprehensive Support", Image: WHYWECHOOSE_IMAGE5 },
    { Name: "Self-Sovereign Data Management", Image: WHYWECHOOSE_IMAGE8 }
];


const ChooseUsSection = () => {
    return (
        <div className=''>

            <div className="why-choose-section position-relative">
                <div className='text-center'>
                    <h1 className='mb-3' >Why Choose Us ?</h1 >
                    <h6 className='text-white '>Unlock the Full Potential of Your Data Security with us</h6>
                </div>
                {/* Center image */}
                <div className="center-image mx-auto position-relative z-1">
                    <img src={WHYWECHOOSE_IMAGE} className="img-fluid" alt="Center" />
                    <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                        <h1 className="why-choose-h1">I-VDES</h1>
                        <p className='text-white'>The Intelligent Visual Data Encryption System</p>
                    </div>
                </div>

                {/* Left items */}
                {leftData.map((v, i) => (
                    <div key={i} className={`why-choose-inner-div left-box box-${i}`}>
                        <div className="row">
                            <div className='col-3 set-center'>
                                <img src={v.Image} alt={v.Name} />
                            </div>
                            <div className='col-9 d-flex justify-content-start align-items-center'>
                                <p className="mb-0 fw-bold  me-3">{v.Name}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Right items */}
                {rightData.map((v, i) => (
                    <div key={i} className={`why-choose-inner-div right-box box-${i}`}>
                        <div className="row">
                            <div className='col-3 set-center'>
                                <img src={v.Image} alt={v.Name} />
                            </div>
                            <div className='col-9 d-flex justify-content-start align-items-center'>
                                <p className="mb-0 fw-bold me-3">{v.Name}</p>
                            </div>



                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChooseUsSection