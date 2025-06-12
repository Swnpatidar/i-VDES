
import React, { useEffect, useRef, useState } from "react";
import "./RotatingNames.css"; // Import external CSS

const ImageProcessingLoader = () => {
  const names = ["Ravin", "Swan", "Akash", "Avinash"];
  const [index, setIndex] = useState(0);
  const textRef = useRef(null);

  useEffect(() => {
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
  }, [names.length]);

  return (
    <div className="rotating-container">
      <div className="rotator">
        <div className="text" ref={textRef}>
          {names[index]}
        </div>
      </div>
    </div>
  );
};

export default ImageProcessingLoader;
