
export const Message = {
    Response: {
        Get: "Data loaded successfully.",
        Post: "Data saved successfully.",
        Put: "Changes updated successfully.",
        Delete: "Item deleted successfully.",
        FormSubmit: "Form submitted successfully.",
        Login: "Login successful. Welcome back!",
        FileUpload: "File uploaded successfully.",
        Error:"Unexpected error occurred. Please try again later.",
        Default:"Sorry, Something Went Wrong. Try again in a moment.",
        Sessionout:"Session expired. Please login again to continue.",
         RegistrationSuccess:"Registration complete. We've sent a verification code to your email.",
         Otpsent_email:"OTP sent to your email.",
        Password_Reset_success:"Password reset successfully.",
        Verfication_success:"Verification successful.",
        OTP_Resend_success:"OTP resent successfully.",
        Failed_Resend_Otp:"Failed to resend OTP. Please try again later."
    }
}

const statusMessage = {
    200: "Success! Operation completed.",
    201: "Created successfully.",
    204: "No content, but action was successful.",
    400: "Bad request. Please check your input.",
    401: "Unauthorized. Please log in again.",
    403: "Forbidden. You don’t have access.",
    404: "Not found. The resource doesn’t exist.",
    409: "Conflict. Duplicate or invalid request.",
    422: "Unprocessable entity. Check your data.",
    500: "Server error. Please try again later.",
    503: "Service unavailable. Try again in a moment.",
}

export const getMessageByStatus = (status) =>
    statusMessage[status] || "Unexpected error occurred.";