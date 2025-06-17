import { CLOSE_ICON } from "../../../utils/app-image-constant";

const withModalWrapper = (WrappedModalComponent) => {
    return ({ isOpen, onClose, ...rest }) => {
        if (!isOpen) return false;
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    {/* <img
                        src={CLOSE_ICON}
                        alt="Close"
                        onClick={onClose}
                        className="position-absolute top-0 end-0 m-4"
                        style={{ width: "25px", height: "25px", cursor: "pointer" }}
                    /> */}
                    <WrappedModalComponent {...rest} onClose={onClose}/> 
                </div>
            </div>
        )
    }
}
export default withModalWrapper;