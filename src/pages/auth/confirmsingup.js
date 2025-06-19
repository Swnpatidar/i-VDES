import React, { useState, useRef, useEffect } from "react";
import { confirmSignUp } from "aws-amplify/auth";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmSignUp = () => {
//   const { state } = useLocation();
  const navigate = useNavigate();
  const [OTP, setOTP] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);



  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // digits only
    if (!value) return;

    const newOTP = [...OTP];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !OTP[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = OTP.join("");
    if (code.length !== 6) {
      alert("Please enter a 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await confirmSignUp({
        username: "sawan.patidar@advantal.net",
        confirmationCode: code,
      });
      console.log("✅ Confirmed:", response);
      alert("Verification successful! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      console.error("❌ Error confirming sign-up:", err);
      alert(err.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>OTP Verification</h2>
      <p>Enter the 6-digit OTP sent to: <strong>dfvdb</strong></p>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "1rem" }}>
        {OTP.map((digit, idx) => (
          <input
            key={idx}
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            ref={(el) => (inputRefs.current[idx] = el)}
            style={{
              width: "3rem",
              height: "3rem",
              fontSize: "1.5rem",
              textAlign: "center",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
};

export default ConfirmSignUp;
