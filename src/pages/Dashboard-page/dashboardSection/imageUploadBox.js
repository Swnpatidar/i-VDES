import React, { useRef, useState } from 'react'
import { CIRCLE_LOADER, IMAGE_ENCRYPTED_GIF, PROCEED_SUCCESS, UPLOAD_GIF } from '../../../utils/app-image-constant';
import ImageProcessingLoader from '../../../components/snippets/Image-processing/image-processing-loader';
import useToast from '../../../hooks/Custom-hooks/useToast';
import { handleAPiStatus } from '../../../utils/handleApiStatus';
import { uploadImageFile } from '../../../hooks/services/api-services';
import { Message } from '../../../utils/toastMessages';

const ImageUploadBox = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [startImageFlipping, setStartImageFlipping] = useState(false)
  const [getData, setGetData] = useState(false)
  const fileInputRef = useRef(null)
  const textRef = useRef(null);
  const toast = useToast()

  // file formats
  const allowedFileTypes = ["image/jpg", "image/jpeg", "image/png"];

  const triggerFileInput = () => {
    fileInputRef?.current?.click(); // Trigger the hidden file input
  }

  // Select file function
  const handleFileSelect = (e) => {
    const file = e?.target?.files[0];
    if (!file) return;
    // Check valid file Size upto 5MB
    if (file?.size > 5242880) {
      toast.error("File size should not exceed 5MB. Please choose again.")
      return false;
    }
    // Check valid file type
    if (!allowedFileTypes?.includes(file?.type)) {
      toast.error("Invalid file format. Only JPG, JPEG, or PNG files are allowed.")
      return false;
    }
    const fileObj = {
      filePath: file,
      size: file?.size,
      fileName: file?.name,
      fileType: file?.type
    }
    setSelectedFile(fileObj)
  }

  console.log("Select File==>", selectedFile)

  //trigger Proceed Next button
  const handleProceedNext = async (e) => {
    e.preventDefault();
    setStartImageFlipping(true)
    const { filePath } = selectedFile;
    const formData = new FormData();
    formData.append("file", filePath);
    setTimeout(() => {
      uploadImage(formData) //function to call api 
    }, 15000);
  }

  // Api call
  const uploadImage = async (formData) => {
    try {
      const response = await uploadImageFile(formData)
      console.log("res==>", response.status)
      if (response.status == 404) {
        toast.success(Message?.fileUpload)
        setSelectedFile(null)
        setStartImageFlipping(false)
        setGetData(true)
      } else {
        handleAPiStatus(response.status, toast)  //Pass the response status and toaster 
      }
    }
    catch (err) {
      toast.error("")
    }
  }


  return (
    <>
      <div className='image-upload-box h-100'>
        <div className="card h-100">
          <div className='set-center'>
            <div class="upload-container">
              {selectedFile && (<>
                {/* Proceed Next */}
                <div className="orbit">
                  <img src={CIRCLE_LOADER} alt="proceed-image" width="100%" />
                </div>
                {startImageFlipping ? (<>
                  <ImageProcessingLoader textRef={textRef} startImageFlipping={startImageFlipping} />
                </>) : (<>
                  <div className='image-upload-center-box'>
                    <img src={PROCEED_SUCCESS} alt="upload-gif" width="90px" height="90px" />
                    <button type="button" onClick={handleProceedNext} className='img-upload-btn text-white'>Processing Next</button>
                    {selectedFile?.fileName && <p><small>{selectedFile?.fileName}</small></p>}
                  </div>
                </>)}

              </>)}
              {!selectedFile && !getData && (<>
                {/* Uploading Image Div*/}
                <div className='image-upload-center-box'>
                  <img src={UPLOAD_GIF} alt="upload-gif" />
                  <button type="button" onClick={() => triggerFileInput()} className='img-upload-btn text-white'>Upload Image</button>
                  <p>Or Drag & Drop Here</p>
                  <input type="file" ref={fileInputRef} onChange={(e) => handleFileSelect(e)} />
                </div>
                </>)}
                {getData && (<>
                  {/* image encrypted Div */}
                  <div className='image-upload-center-box'>
                    <img src={IMAGE_ENCRYPTED_GIF} className='my-2' alt="upload-gif" width="70px" />
                    <button type="button" className='img-upload-btn text-white pe-none'>Image Encrypted</button>
                  </div>
                </>)}
              
            </div>
          </div>
          <div className='set-center flex-column'>
            <p className='my-3'><small>Accepted formats: JPG, JPEG, PNG. Maximum file size: 5MB.</small></p>
            <h4 className='text-center my-5 display-6'>Unleashes a Quicker,<br /> Cleverer Method to Encrypt Your Data</h4>
          </div>
        </div>
      </div >
    </>
  )
}

export default ImageUploadBox;