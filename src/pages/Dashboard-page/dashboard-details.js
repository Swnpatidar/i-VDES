import BreadCrum from "../../components/common/BreadCrum";
import Button from "../../components/common/button";
import { UPLOAD_ICON } from "../../utils/app-image-constant";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../hooks/routes/routes-constant";

import { WrappedDountChart, WrappedAccuracyLineChart, WrappedLineChart, WrappedTimelineChart, WrappedStylishlineChart } from "./dashboardSection/wrappedChartComponent";

const DashboardDetails = () => {
  const navigate = useNavigate();
  const handleDataBack = () => {
    navigate(ROUTES.DASHBOARD);
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <BreadCrum
          firstData="Dashboard"
          iconshow1={true}
          secondData="Details"
          onFirstDataClick={handleDataBack}
        />
        <Button
          label="Upload"
          className="rounded-3 px-3 fs-14 "
          onClick={() => navigate(ROUTES?.DASHBOARD)}
          icon={UPLOAD_ICON}
          iconPosition="front"
        />
      </div>

      <>
        <div className="gradient-common-bg">
          <div className="row">
            <div className="col-12 col-lg-3 mb-4">
              <div className="data-statistics h-100">
                <WrappedDountChart/>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-4">
              <WrappedLineChart/>
            </div>
            <div className="col-12 col-lg-5 mb-4">
              <WrappedAccuracyLineChart/>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-6 mb-4">
              <WrappedStylishlineChart/>
            </div>
            <div className="col-12 col-lg-6 mb-4">
              <WrappedTimelineChart/>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default DashboardDetails;
