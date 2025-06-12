import React from "react";
import { CLOSE_ICON } from "../../utils/app-image-constant";
import { useTranslation } from "react-i18next";

const Modal = ({
  modalId = "defaultModalId",
  modalBody,
  buttonLable = "",
  cancelLable = "",
  modalClick = null,
  modalClose,
  modalimg = "",
  title = "",
  msg = "",
  onOkClick = "",
  children,
  heading = "",
  className = "",
  logoutimg = "",
  iconsrc = "",
  modalContentClass = "",
  paragraph = "",
  paragraphclassName = "",
  closebtnclass = "",
  handleModalClose = function o() {},
  handleClick = function o() {},
}) => {
  const { t } = useTranslation();

  return (
    <div className="emp-model">
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
        ref={modalClick}
      ></button>

      <div
        className="modal fade custom-modal-backdrop"
        id={modalId}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby={`${modalId}Label`}
        aria-hidden="true"
      >
        <div className={`modal-dialog modal-dialog-centered ${className}`}>
          <div className="modal-content">
            <div className={`${modalContentClass}`}>
              <div className="modal-header">
                <button
                  type="button"
                  className={`btn btnclose closebtn ${closebtnclass}`}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleModalClose}
                >
                  <img src={CLOSE_ICON} alt="close" className="closeicon" />
                </button>
                <h5 className="modal-title" id={`${modalId}Label`}>
                  {title}
                </h5>
              </div>

              <div className={`modal-body ${modalContentClass}`}>
                {iconsrc && (
                  <img
                    src={iconsrc}
                    alt="icon"
                    className={`modelsuccessimg mb-2 ${logoutimg}`}
                  />
                )}
                <h2 className="tableheading fs-22 mb-2 fw-600">{t(heading)}</h2>
                {children}
                <p className={`paragraphtext fs-12 ${paragraphclassName}`}>
                  {paragraph}
                </p>
              </div>

              <div className="modal-footer modal-footer justify-content-center">
                {buttonLable && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={onOkClick}
                  >
                    {t(buttonLable)}
                  </button>
                )}
                {cancelLable && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    {t(cancelLable)}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
