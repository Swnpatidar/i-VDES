import React from 'react'
import { PAGE_404 } from '../utils/app-image-constant';
import { ROUTES } from '../hooks/routes/routes-constant';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="content-w">
            <div className="content-i">
                <div className="content-box">
                    <div className="d-flex align-items-center justify-content-center vh-100">
                        <div className="text-center">
                            <img src={PAGE_404} className="w-50" alt='icon'/>
                            <p className="fs-3">
                                {" "}
                                <span className="text-danger">Oops!</span> Page not found.
                            </p>
                            <p className="lead mb-3">
                                The page you’re looking for doesn’t exist.
                            </p>
                            <Link to={ROUTES.INDEX} className=" comman_btn py-2 fs-6 ">
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound;