import { ACCESS_IMAGE_PERMISSION } from "../../utils/app-image-constant";

const AccessPermissionpage = () => {
  return (
    <>
      <div
        style={{
          height: "80vh", // Full viewport height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f2f4f8",
          flexDirection: "column",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <img
          src={ACCESS_IMAGE_PERMISSION}
          alt="Access Denied"
          style={{ width: "250px", maxWidth: "100%" }}
        />
        <h5 className="fw-5 mt-3 text-primary">
          You Don't Have Permission To Access This Page!
        </h5>
      </div>
    </>
  );
};

export default AccessPermissionpage;
