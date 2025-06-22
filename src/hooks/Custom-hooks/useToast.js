import { toast } from "react-toastify"

const useToast = () => {
   
    return {
        success: (msg, options = {}) => toast.success(msg, {className: 'toast-success', ...options }),
        error: (msg, options = {}) => toast.error(msg, { className: 'toast-error', ...options }),
        info: (msg, options = {}) => toast.info(msg, {className: 'toast-info',  ...options }),
        warn: (msg, options = {}) => toast.warn(msg, {className: 'toast-warn',  ...options }),
    }
}

export default useToast;