import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import "../../i18n";
import { LANGUAGECHANGE } from "../../utils/aap-image-constant";

const LanguageChange = ({ bgColour }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };
  useEffect(() => {
    if (i18n.language === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.body.classList.add("rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.body.classList.remove("rtl");
    }
  }, [i18n.language]);
  return (
    <>
      <div className="dropdown">
        <button
          className={`dropdown-toggle languageicon  border-0 fs-22 ${bgColour}`}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {/* <i className="bi bi-translate "></i> */}
          <img src={LANGUAGECHANGE} alt="icon" />
        </button>
        <ul className="dropdown-menu">
          <li onClick={() => changeLanguage("en")} className=" cursor-pointer">
            <span className="dropdown-item">English</span>{" "}
          </li>
          <li className=" cursor-pointer" onClick={() => changeLanguage("fr")}>
            <span className="dropdown-item">Français</span>
          </li>
          <li className=" cursor-pointer" onClick={() => changeLanguage("ar")}>
            <span className="dropdown-item">العربية</span>
          </li>
        </ul>
      </div >
    </>
  );
};
export default LanguageChange;
