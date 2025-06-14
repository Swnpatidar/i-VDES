export const Message = {
    Response: {
        Get: "Data loaded successfully.",
        Post: "Data saved successfully.",
        Put: "Changes updated successfully.",
        Delete: "Item deleted successfully.",
        FormSubmit: "Form submitted successfully.",
        Login: "Login successful. Welcome back!",
        fileUpload: "File uploaded successfully."
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