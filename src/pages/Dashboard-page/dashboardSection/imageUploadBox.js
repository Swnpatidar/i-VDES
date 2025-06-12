import React, { useRef, useState } from 'react'
import { PROCEED_GIF, PROCEED_NEXT_DONE, UPLOAD_GIF } from '../../../utils/app-image-constant';

const ImageUploadBox = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const triggerFileInput = () => {
    fileInputRef?.current?.click(); // Trigger the hidden file input
  }

  // Upload file function
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file)
  }
  console.log("Select File==>", selectedFile)
  return (
    <>
      <div className='image-upload-box'>
        <div className="card">
          <div className='d-flex justify-content-center align-items-center'>
            <div class="upload-container">
              {selectedFile && (<>
                <div className="orbit">
                  <img src={PROCEED_GIF} alt="proceed-image" width="100%" />
                </div>
                <div className='image-upload-center-box'>
                  <div>
                    <img src={PROCEED_NEXT_DONE} alt="upload-gif" width="200px" />
                    <br></br>
                    <button type="button" onClick={() => triggerFileInput()} className='img-upload-btn text-white'>Processing Next</button>
                  </div>
                </div>
              </>)}
              {!selectedFile && (<>
                <div className='image-upload-center-box'>
                  <div>
                    <img src={UPLOAD_GIF} alt="upload-gif" />
                    <br></br>
                    <button type="button" onClick={() => triggerFileInput()} className='img-upload-btn text-white'>Upload Image</button>
                    <p>Or Drag & Drop Here</p>
                    <input type="file" ref={fileInputRef} onChange={(e) => handleFileChange(e)} />
                  </div>
                </div>
              </>)}
            </div>
          </div>
          <div className='d-flex justify-content-center align-items-center'>
            <h4 className='text-center my-5'>Unleashes a Quicker,<br /> Cleverer Method to Encrypt<br /> Your Data</h4>
          </div>


        </div>

      </div >

    </>
  )
}

export default ImageUploadBox;