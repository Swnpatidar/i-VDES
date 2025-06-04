// import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LabelList,
// } from "recharts";
// import { getDoctorsCountByClinic } from "../../hooks/services/api-services";
// import { useSelector } from "react-redux";
// import { decryptAEStoJSON, LoaderSpinner } from "../../utils/utilities";
// import { NOAVAILABILITYADDED } from "../../utils/aap-image-constant";

// function SimpleBarChart() {
//   const { t } = useTranslation();
//   const [chartData, setChartData] = useState([]);
//   const [isMobile, setIsMobile] = useState(false);
//   const [doctorCount, setDoctorCount] = useState(0);
//   const [isLoading, setIsLoading] = useState(false); // NEW
//   const { value } = useSelector((state) => state?.loggedUser || {});
//   const userData = value ? decryptAEStoJSON(value) : null;
//   const clinicId = userData?.id;

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true); // START
//       try {
//         const response = await getDoctorsCountByClinic(clinicId);
//         const data = response?.data?.data;
//         const result = response?.data?.data?.specializationResponseList || [];
       
//         const formattedData = result.map((item) => ({
//           name: item.specializationName,
//           Count: item.count,
//         }));
//         setDoctorCount(data?.doctorsCount || 0);
//         setChartData(formattedData);
//       } catch (error) {
//         // handle error if needed
//       } finally {
//         setIsLoading(false); // END
//       }
//     };

//     if (clinicId) fetchData();
//   }, [clinicId, t]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <>
//       {isLoading ? (
//         <div className="d-flex justify-content-center py-5">
//           <LoaderSpinner />
//         </div>
//       ) : chartData.length === 0 ? (
//         <div className="text-center">
//           <img
//             src={NOAVAILABILITYADDED}
//             alt="icon"
//             className="modelsuccessimg mb-2"
//           />
//           <h2 className="tableheading fs-18 mb-2 fw-500">
//             No Data Found !
//           </h2>

//         </div>
//       ) : (
//         <>
//           <h3 className="fw-600 fs-55 mb-4">{doctorCount}</h3>
//           <div style={{ textAlign: "center" }}>
//             <ResponsiveContainer width="100%" height={220}>
//               <BarChart
//                 data={chartData}
//                 margin={{ top: 50, right: 0, left: 0, bottom: 0 }}
//               >
//                 <XAxis
//                   dataKey="name"
//                   angle={0}
//                   tickMargin={0}
//                   axisLine={false}
//                   tickLine={false}
//                   interval={0}
//                   style={{ fill: "#458FF0" }}
//                 />
//                 <Tooltip
//                   cursor={false}
//                   contentStyle={{
//                     backgroundColor: "#E0F0E0",
//                     borderRadius: "20px",
//                   }}
//                 />
//                 <Bar
//                   dataKey="Count"
//                   fill="#458FF0"
//                   barSize={isMobile ? 17 : 40}
//                   radius={[10, 10, 10, 10]}
//                 >
//                   <LabelList dataKey="Count" position="top" />
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </>
//       )}
//     </>
//   );
// }

// export default SimpleBarChart;


import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { getDoctorsCountByClinic } from "../../hooks/services/api-services";
import { useSelector } from "react-redux";
import { decryptAEStoJSON, LoaderSpinner } from "../../utils/utilities";
import { NOAVAILABILITYADDED } from "../../utils/aap-image-constant";

function SimpleBarChart() {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [doctorCount, setDoctorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { value } = useSelector((state) => state?.loggedUser || {});
  const userData = value ? decryptAEStoJSON(value) : null;
  const clinicId = userData?.id;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getDoctorsCountByClinic(clinicId);
        const data = response?.data?.data;
        const result = data?.specializationResponseList || [];

        const formattedData = result.map((item) => ({
          name:
            item.specializationName.length > 10
              ? item.specializationName.slice(0, 10) + "…"
              : item.specializationName,
          fullName: item.specializationName,
          Count: item.count,
        }));

        setDoctorCount(data?.doctorsCount || 0);
        setChartData(formattedData);
      } catch (error) {
        // handle error
      } finally {
        setIsLoading(false);
      }
    };

    if (clinicId) fetchData();
  }, [clinicId, t]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center py-5">
          <LoaderSpinner />
        </div>
      ) : chartData.length === 0 ? (
        <div className="text-center">
          <img
            src={NOAVAILABILITYADDED}
            alt="icon"
            className="modelsuccessimg mb-2"
          />
          <h2 className="tableheading fs-18 mb-2 fw-500">No Data Found !</h2>
        </div>
      ) : (
        <>
          <h3 className="fw-600 fs-55 mb-4">{doctorCount}</h3>
          <div style={{ textAlign: "center" }}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={chartData}
                margin={{ top: 50, right: 0, left: 0, bottom: 60 }}
              >
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  tickMargin={10}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  style={{ fill: "#458FF0", fontSize: isMobile ? 10 : 12 }}
                />
                <Tooltip
                  cursor={false}
                  formatter={(value) => [`${value}`, "Count"]}
                  labelFormatter={(label, payload) => {
                    const data = payload?.[0]?.payload;
                    return data?.fullName || label;
                  }}
                  contentStyle={{
                    backgroundColor: "#E0F0E0",
                    borderRadius: "20px",
                  }}
                />
                <Bar
                  dataKey="Count"
                  fill="#458FF0"
                  barSize={isMobile ? 17 : 40}
                  radius={[10, 10, 10, 10]}
                >
                  <LabelList dataKey="Count" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </>
  );
}

export default SimpleBarChart;
