import React from 'react'
import { WHYWECHOOSE_IMAGE, WHYWECHOOSE_IMAGE1, WHYWECHOOSE_IMAGE2, WHYWECHOOSE_IMAGE3, WHYWECHOOSE_IMAGE4, WHYWECHOOSE_IMAGE5, WHYWECHOOSE_IMAGE6, WHYWECHOOSE_IMAGE7, WHYWECHOOSE_IMAGE8 } from '../../utils/app-image-constant';

const data = [
    {
        Name: "Unmatched Performance",
        Image: WHYWECHOOSE_IMAGE1,
        marginLeft: "165px"
    },
    {
        Name: "Enhanced Security",
        Image: WHYWECHOOSE_IMAGE2,
        marginLeft: "100px"
    },
    {
        Name: "Regulatory Compliance",
        Image: WHYWECHOOSE_IMAGE3,
        marginLeft: "130px"
    },
    {
        Name: "Future-Proof Technology",
        Image: WHYWECHOOSE_IMAGE4,
        marginLeft: "155px"
    }
];

const data2 = [
    {
        Name: "Future-Proof Technology",
        Image: WHYWECHOOSE_IMAGE7,
        marginRight: "165px"
    },
    {
        Name: "Cost Efficiency",
        Image: WHYWECHOOSE_IMAGE6,
        marginRight: "100px"
    },
    {
        Name: "Comprehensive Support",
        Image: WHYWECHOOSE_IMAGE5,
        marginRight: "130px"
    },
    {
        Name: "Self-Sovereign Data Management",
        Image: WHYWECHOOSE_IMAGE8,
        marginRight: "155px"
    }
];


const ChooseUsSection = () => {
    return (
        <>
            <div className='why-choose-section'>
                <div className='row'>
                    {/* Left Column */}
                    <div className='col-4 d-flex flex-column justify-content-center'>
                        {data.map((v, i) => (
                            <div
                                className='why-choose-inner-div mt-5'
                                key={i}
                                style={{ marginLeft: v.marginLeft }}
                            >
                                <div className='row align-items-center'>
                                    <div className='col-3 d-flex justify-content-center align-items-center'>
                                        <img src={v.Image} alt={v.Name} />
                                    </div>
                                    <div className='col-9'>
                                        <p className='mb-0 fw-bold'>{v.Name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Center Image */}

                    <div className="col-4 d-flex justify-content-center align-items-center">
                        <div className="position-relative">
                            <img src={WHYWECHOOSE_IMAGE} alt="" className="img-fluid mt-5" />
                            <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
                                <h1 className='why-choose-h1'>I-VDES</h1>
                                <p>The Intelligent Visual Data Encryption System</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (empty for now) */}
                    <div className='col-4 d-flex flex-column justify-content-center align-items-end'>
                        {data2.map((v, i) => (
                            <div
                                className='why-choose-inner-div mt-5'
                                key={i}
                                style={{ marginRight: v.marginRight }}
                            >
                                <div className='row align-items-center'>
                                    <div className='col-3 d-flex justify-content-center align-items-center'>
                                        <img src={v.Image} alt={v.Name} />
                                    </div>
                                    <div className='col-9'>
                                        <p className='mb-0 fw-bold'   >{v.Name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>

    );
}

export default ChooseUsSection