import BreadCrum from "../../components/common/BreadCrum";
import Button from "../../components/common/button";
import { UPLOAD_ICON } from "../../utils/app-image-constant";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from "../../hooks/routes/routes-constant";
import DataStatistics from "./dashboardSection/data-statistics";
import ImageClassification from "./dashboardSection/image-classification";
import AccuracyModal from "./dashboardSection/accuracyModal";
import MonthlyEncryp from "./dashboardSection/monthlyEncryp";
import EncrypUsesTimeline from "./dashboardSection/encrypUsesTimeline";

const DashboardDetails = () => {
  const navigate = useNavigate();
 const handleDataBack = () => {
    navigate(ROUTES.DASHBOARD);
  }
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <BreadCrum
          firstData="Dashboard"
          iconshow1={true}
          secondData="Details"
            onFirstDataClick={handleDataBack}
        />
          <Button label='Upload' className="rounded-3 px-4 fs-14 "   onClick={() => navigate(ROUTES?.DASHBOARD)}   icon={UPLOAD_ICON} iconPosition="front" />
      </div>

    <>
  <div className="row g-4">
    {/* Row 1: 3 Cards in one row */}
    <div className="col-12 col-lg-3 ">
      <DataStatistics />
    </div>
    <div className="col-12 col-lg-4">
      <ImageClassification />
    </div>
    <div className="col-12 col-lg-5">
      <AccuracyModal />
    </div>

    {/* Row 2: 2 Cards in one row */}
    <div className="col-12 col-lg-6">
      <MonthlyEncryp />
    </div>
    <div className="col-12 col-lg-6">
      <EncrypUsesTimeline />
    </div>
  </div>
</>

    </div>
  );
};

export default DashboardDetails;
