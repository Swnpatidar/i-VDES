
import React, { useEffect, useRef, useState } from "react";

const ImageProcessingLoader = ({textRef,startImageFlipping}) => {
  const names = ["Visual Data", "Normalization", "Augmentation", "Fine-tuning", "Image Tagging", "Validation", "Encrypting"]
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!startImageFlipping) return; 
    const interval = setInterval(() => {
      if (textRef.current) {
        textRef.current.classList.remove("flipIn");
        textRef.current.classList.add("flip");
        setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % names.length);
          if (textRef.current) {
            textRef.current.classList.remove("flip");
            textRef.current.classList.add("flipIn");
          }
        }, 500);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [startImageFlipping]);

  return (
    <div className="rotating-container">
      <div className="rotator">
        <div className="text gradient-text" ref={textRef}>
          {names[index]}
        </div>
      </div>
    </div>
  );
};

export default ImageProcessingLoader;
