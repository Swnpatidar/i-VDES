import React from "react";

const WithChartWrapper = (WrappedComponent,title="") => {
  return function WrappedWithChart(props) {
    return (
    
        <div className="card h-100">
          <div className="card-header d-sm-flex d-block pb-4">
            <div className="me-auto pe-3 mb-sm-0 mb-3">
            {title && <h4 className="fs-20">{title}</h4>}
            </div>
          </div>
       
          <div className="card-body pt-0 pb-0  ">
             <WrappedComponent {...props} />
             {/* <WrappedComponent1 {...props} /> */}
             
          </div>
        </div>
     
    );
  };
};

export default WithChartWrapper;
