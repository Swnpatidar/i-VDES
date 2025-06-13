import React, { useRef, useState } from 'react'
import { CIRCLE_LOADER, PROCEED_SUCCESS, UPLOAD_GIF } from '../../../utils/app-image-constant';
import ImageProcessingLoader from '../../../components/snippets/Image-processing/image-processing-loader';

const ImageUploadBox = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [startImageProcessingLoader, setStartImageProcessingLoader] = useState(false)
  const fileInputRef = useRef(null)
  const textRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef?.current?.click(); // Trigger the hidden file input
  }

  // Select file function
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file)
  }
  console.log("Select File==>", selectedFile)

  //Api call for upload Image
  const handleUploadApiCall = (e) => {
    // e.preventDefault();
    setStartImageProcessingLoader(true)
  }

  return (
    <>
      <div className='image-upload-box h-100'>
        <div className="card h-100">
          <div className='d-flex justify-content-center align-items-center'>
            <div class="upload-container">
              {selectedFile && (<>
                {/* Proceed Next */}
                <div className="orbit">
                  <img src={CIRCLE_LOADER} alt="proceed-image" width="100%" />
                </div>
                <div className='image-upload-center-box'>
                  <img src={PROCEED_SUCCESS} alt="upload-gif" width="90px" height="90px" />
                  <button type="button" onClick={handleUploadApiCall} className='img-upload-btn text-white'>Processing Next</button>
                </div>
              </>)}
              {!selectedFile && (<>
                {/* Uploading Image */}
                <div className='image-upload-center-box'>
                  <img src={UPLOAD_GIF} alt="upload-gif" />
                  <button type="button" onClick={() => triggerFileInput()} className='img-upload-btn text-white'>Upload Image</button>
                  <p>Or Drag & Drop Here</p>
                  <input type="file" ref={fileInputRef} onChange={(e) => handleFileSelect(e)} />
                </div>
              </>)}
            </div>
          </div>
          <div className='d-flex justify-content-center align-items-center'>
            <h4 className='text-center my-5'>Unleashes a Quicker,<br /> Cleverer Method to Encrypt<br /> Your Data</h4>
          </div>
        </div>
      </div >
      {/* {startImageProcessingLoader && <ImageProcessingLoader textRef={textRef} startImageProcessingLoader={startImageProcessingLoader} />} */}
    </>
  )
}

export default ImageUploadBox;