import { getMessageByStatus } from "./toastMessages"

export const handleAPiStatus = (status, toastfn) => {
    const defaultMsg = "Something went wrong. Please try again later."
    const msg = status? getMessageByStatus(status): defaultMsg;
    console.log("status=>", status)
    if (+status >= 200 && +status < 300) {
        toastfn.success(msg);
    } else {
        toastfn.error(msg);
    }
    return
}