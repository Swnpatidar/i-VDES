import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const NumberInputs = ({
  value,
  name,
  placeHolder,
  handleChange,
  error,
  labelName,
  showAsterisk = true,
  lableClassName = "",
  countryList = [],
  defaultCountryCode = "+966",
  onCountryChange = () => {},
  ...rest
}) => {
  const { t, i18n } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    if (countryList.length) {
      const defaultCountry = countryList.find((c) => c.dial_code === defaultCountryCode) || countryList[0];
      setSelectedCountry(defaultCountry);
    }
  }, [countryList]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    onCountryChange(country);
    setIsOpen(false);
  };

  return (
    <>
      <label className={`${lableClassName}`} htmlFor={name}>
        {t(labelName)} {showAsterisk && <span className="text-danger">*</span>}
      </label>

      <div className={`input-group position-relative`} ref={dropdownRef}>
        {/* Country code dropdown toggle */}
        <div
          className="input-group-text bg-white border-radius_input cursor-pointer d-flex align-items-center"
          onClick={() => setIsOpen(!isOpen)}
          style={{ minWidth: "100px" }}
        >
          {selectedCountry?.logo && (
            <img
              src={selectedCountry.logo}
              alt="flag"
              style={{ width: "20px", height: "14px", marginRight: "6px" }}
            />
          )}
          <span>{selectedCountry?.dial_code}</span>
          <span className="ms-1">&#9662;</span>
        </div>

        {/* Phone input */}
        <input
          type="number"
          name={name}
          value={value}
          className={`form-control ${error ? "border-danger bg-error" : ""}`}
          placeholder={t(placeHolder)}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-", "."].includes(e.key)) {
              e.preventDefault();
            }
          }}
          {...rest}
        />

        {/* Dropdown menu */}
        {isOpen && (
          <div className="custom-dropdown-menu">
            {countryList.map((country) => (
              <div
                key={country.id}
                className="custom-dropdown-item"
                onClick={() => handleCountrySelect(country)}
              >
                <img
                  src={country.logo}
                  alt={country.name}
                  style={{ width: "20px", height: "14px", marginRight: "8px" }}
                />
                <span>{country.name}</span> &nbsp;
                <span className="text-muted">({country.dial_code})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NumberInputs;
