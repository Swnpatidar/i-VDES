import React from "react";
import { EDIT_ICON, PLUS_ICON, SEARCH_ICN } from "../../utils/aap-image-constant";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";
import { convertToInputDateFormat } from "../../utils/form-utils";
import moment from "moment";
const TableHeading = ({
  title = "",
  todayDate,
  selectedDate,
  setSelectedDate,
  searchValue,
  setSearchValue,
  onSearchChange,
  data,
  addButtonClick,
  editButtonClick,
  ButtonClick,
  permissionAccessbtn = "",
  labelName,
  lableclassName,
  name,
  options,
  value,
  handleSelect,
  showEditbutton = false,
  showNormalbutton=false,
  className = "",
  disabled = false,
  showDropdown = false,
  showuploadbtn = false,
  showbutton = true,
  showsearchinput = true,
  showDateinput = false,
  showastrict = false,
  message = "",
  showEditButton = false,
  button=false,
  handleClear = () => { },
}) => {
  const { t, i18n } = useTranslation();

  const onChange = (e) => {
    if (e.target.value?.length > 0) {
      setSearchValue(e.target.value);
    } else {
      setSearchValue("");
    }
  };
  const handleDateChange = (e) => {
    if (e.target.value?.length > 0) {
      setSelectedDate(moment(e.target.value).format(t("DD-MM-YYYY")));
    } else {
      setSelectedDate("");
    }
  };
  const debouncedOnChange = debounce(onChange, 500);
  return (
    <div className="container-fluid">
      <div className=" row mb-3">
        <div className="col-12 col-md-6 ps-0 mb-sm-0 mb-2 d-flex align-items-center">
          <div className="mb-md-0 mb-2">
            <h5 className={`fs-18 fw-600 ${className}`}>{title}</h5>
          </div>

        </div>
        <div className="col-12 col-md-6  p-0">
          <div className="d-flex justify-content-start justify-content-md-end   ps-lg-2 ps-0">

            <div className="d-flex  gap-2">
              {showDropdown && (
                <div className="dropdown-container input-group mb-sm-0 mb-2">
                  <label className={lableclassName}>
                    {t(labelName)}
                    {showastrict && <span className="text-danger">*</span>}
                  </label>
                  <select
                    name={name}
                    className={`form-select appointmentfromselect me-sm-2 me-0 textcolor ${className}`}
                    value={value}
                    onChange={handleSelect}
                    aria-label={labelName}
                    disabled={disabled}
                  >
                    <option value={0} >{t("All")}</option>
                    {options?.length > 0 &&
                      options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </select>
                  {/* Display a message if the dropdown is disabled */}
                  {disabled && message && (
                    <div
                      className="disabled-message"
                      style={{ color: "red", marginTop: "5px", fontSize: "8px" }}
                    >
                      {message}
                    </div>
                  )}
                </div>
              )}
              {showsearchinput && (
                <div
                  className={`input-group mb-sm-0 mb-2 ${i18n.language === "ar" ? "flex-row-reverse" : "flex-row"
                    }`}
                >
                  <input
                    type="text"
                    // name="searchValue"
                    // value={searchValue}
                    // onChange={onSearchChange}
                    onChange={debouncedOnChange}
                    className="form-control tablesearch "
                    placeholder={t("Search")}
                  />
                  <span className="input-group-text input-background">
                    {" "}
                    <img src={SEARCH_ICN} alt="..." className="searchicon" />
                  </span>
                </div>)}
              {showDateinput && (
                <div className="input-group mb-lg-0 mb-2">
                  <input
                    type="date"
                    className="form-control"
                    min={todayDate}
                    value={convertToInputDateFormat(selectedDate)}
                    name="date"
                    onChange={handleDateChange}
                  />
                </div>
              )}

              {showbutton && (
                <button
                  className={`border-0 buttonColor text-white rounded-3 p-2 ms-0  text-nowrap  mb-sm-0 mb-2 me-2 fs-12 ${i18n.language === "ar" ? "me-lg-2" : "ms-lg-2"
                    }`}
                  onClick={addButtonClick}
                >
                  {t("Add " + data)}
                  <span >
                    <img src={PLUS_ICON} alt="" className="plusicon" />
                  </span>
                </button>
              )}
              {showEditButton && (
                <button
                  className={`border-0 buttonColor text-white rounded-3 p-2  ms-0  text-nowrap  mb-sm-0 mb-2 me-2 fs-14 ${i18n.language === "ar" ? "me-lg-2" : "ms-lg-2"
                    }`}
                  onClick={addButtonClick}
                >
                  {t(data)}
                  <span >
                    <img src={EDIT_ICON} alt="" className="plusicon ms-2" />
                  </span>
                </button>
              )}
              {showEditbutton && (
                <button
                  className={`border-0 buttonColor text-white rounded-4 p-2 ms-0  text-nowrap  mb-md-0 mb-2 textfont14 ${i18n.language === "ar" ? "me-lg-2" : "ms-lg-2"
                    }`}
                  onClick={editButtonClick}
                >
                  {t("Edit " + data)}
                  <span className="ms-2">
                    <img src={EDIT_ICON} alt="" className="plusicon" />
                  </span>
                </button>
              )}
              {showNormalbutton && (
                <button
                  className={`border-0 buttonColor text-white rounded-3 p-2 ms-0  text-nowrap  mb-md-0 mb-2 textfont14 ${i18n.language === "ar" ? "me-lg-2" : "ms-lg-2"
                    }`}
                  onClick={ButtonClick}
                >
                  {t(data)}
                  
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default TableHeading;
