import ImageClassification from "./image-classification";
import DataStatistics from "./data-statistics";
import MonthlyEncryp from "./monthlyEncryp";
import AccuracyModal from "./accuracyModal";
import EncrypUsesTimeline from "./encrypUsesTimeline";
import BreadCrum from "../../components/common/BreadCrum";
import Button from "../../components/common/button";
import { UPLOAD_ICON } from "../../utils/app-image-constant";
import { useNavigate } from 'react-router-dom';
import { ROUTES } from "../../hooks/routes/routes-constant";

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
