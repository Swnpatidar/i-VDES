import React, { useRef, useState } from "react";
import {
  CIRCLE_LOADER,
  IMAGE_ENCRYPTED_GIF,
  PROCEED_SUCCESS,
  UPLOAD_GIF,
} from "../../../utils/app-image-constant";
import ImageProcessingLoader from "../../../components/snippets/Image-processing/image-processing-loader";
import useToast from "../../../hooks/Custom-hooks/useToast";
import { handleAPiStatus } from "../../../utils/handleApiStatus";
import { uploadImageFile } from "../../../hooks/services/api-services";
import { Message } from "../../../utils/toastMessages";
import { useLoggedInUserDetails } from "../../../utils/utilities";

const ImageUploadBox = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [startImageFlipping, setStartImageFlipping] = useState(false);
  const [getData, setGetData] = useState(false);
  const fileInputRef = useRef(null);
  const textRef = useRef(null);
  const toast = useToast();
  const user = useLoggedInUserDetails();

  // file formats
  const allowedFileTypes = ["image/jpg", "image/jpeg", "image/png"];

  const triggerFileInput = () => {
    fileInputRef?.current?.click(); // Trigger the hidden file input
  };

  //This converts file/blob to base64
  const fileToBase64String = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result;
        const img = new Image();

        img.onload = () => {
          resolve({
            base64String: base64,
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        };

        img.onerror = reject;
        img.src = base64;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (e) => {
    let file=null
    if (e?.dataTransfer?.files[0]) {
      file = e.dataTransfer.files[0]; // dragged file
    } else if (e?.target?.files[0]) {
      file = e.target.files[0]; // file from input
    }

    if (!file) {
      toast.error("No file selected. Please choose an image to continue.");
      return;
    }


    let fileObj = {};
    let fileToBase64 = {};
    //get base64 string
    if (file) {
      try {
        fileToBase64 = await fileToBase64String(file);
        const pureBase64 = fileToBase64?.base64String?.split(",")?.[1];
        fileObj = {
          base64: pureBase64,
          size: file?.size,
          fileName: file?.name,
          fileType: file?.type,
        };
      } catch (error) {
        console.error("Error converting to base64:", error);
        return;
      }
    }

    // step 1- Check valid file Size upto 7.5MB
    if (file?.size > 7864320) {
      toast.error("File size should not exceed 7.5MB. Please choose again.");
      return false;
    }

    // step 2- Check valid file type
    if (!allowedFileTypes?.includes(file?.type)) {
      toast.error(
        "Invalid file format. Only JPG, JPEG, or PNG files are allowed."
      );
      return false;
    }

    // step 3- Check valid image resolution 800X600
    if (fileToBase64?.width < 800 && fileToBase64?.height < 600) {
      toast.error(
        "Your image resolution is too low. Minimum required size is 800 × 600 pixels."
      );
      return false;
    }

    setSelectedFile(fileObj);
  };

  console.log("Select File==>", selectedFile);

  //trigger Proceed Next button
  const handleProceedNext = async (e) => {
    e.preventDefault();
    setStartImageFlipping(true); //flipping will strat
    setTimeout(() => {
      uploadImage(); //function to call api for image upload
    }, 15000);
  };

  // Api call
  const uploadImage = async () => {
    const { base64, fileName } = selectedFile;
    const imagePayload = {
      folder: user?.email,
      filename: fileName,
      content: base64,
    };
    try {
      const response = await uploadImageFile(imagePayload);
      if (response.status === 200) {
        toast.success(Message?.Response?.FileUpload);
        setStartImageFlipping(false);
        setSelectedFile(null);
        setGetData(true);
      } else {
        handleAPiStatus(response.status, toast); //Pass the response status and toaster
      }
    } catch (err) {
      toast.error(Message?.Response?.Default);
    }
  };
  const [isDragging, setIsDragging] = useState(false);

  return (
    <>
      <div className="image-upload-box h-100">
        <div className="card h-100">
          <div className="set-center">
            <div
              className={`upload-container ${isDragging ? "drag-over" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileSelect}
              onDragEnter={() => setIsDragging(true)}
              onDragLeave={() => setIsDragging(false)}
            >
              {selectedFile && (
                <>
                  {/* Proceed Next */}
                  <div className="orbit">
                    <img src={CIRCLE_LOADER} alt="proceed-image" width="100%" />
                  </div>
                  {startImageFlipping ? (
                    <>
                      <ImageProcessingLoader
                        textRef={textRef}
                        startImageFlipping={startImageFlipping}
                      />
                    </>
                  ) : (
                    <>
                      <div className="image-upload-center-box">
                        <img
                          src={PROCEED_SUCCESS}
                          alt="upload-gif"
                          width="90px"
                          height="90px"
                        />
                        <button
                          type="button"
                          onClick={handleProceedNext}
                          className="img-upload-btn text-white"
                        >
                          Processing Next
                        </button>
                        {selectedFile?.fileName && (
                          <p>
                            <small>{selectedFile?.fileName}</small>
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
              {!selectedFile && !getData && (
                <>
                  {/* Uploading Image Div*/}
                  <div className="image-upload-center-box">
                    <img src={UPLOAD_GIF} alt="upload-gif" />
                    <button
                      type="button"
                      onClick={() => triggerFileInput()}
                      className="img-upload-btn text-white"
                    >
                      Upload Image
                    </button>
                    <p>Or Drag & Drop Here</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => handleFileSelect(e)}
                    />
                  </div>
                </>
              )}
              {getData && (
                <>
                  {/* image encrypted Div */}
                  <div className="image-upload-center-box">
                    <img
                      src={IMAGE_ENCRYPTED_GIF}
                      className="my-2"
                      alt="upload-gif"
                      width="70px"
                    />
                    <button
                      type="button"
                      className="img-upload-btn text-white pe-none"
                    >
                      Image Encrypted
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="set-center flex-column">
            <p className="my-3">
              <small>Accepted formats: JPG, JPEG, PNG.</small>
            </p>
            <h4 className="text-center my-5 display-6">
              Unleashes a Quicker,
              <br /> Cleverer Method to Encrypt Your Data
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUploadBox;
