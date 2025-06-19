import React, { useState, useRef, useEffect } from "react";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/button";

const ConfirmSignUp = () => {
  const navigate = useNavigate();
  const [OTP, setOTP] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(60);
  const user_email= state.email
  const inputRefs = useRef([]);
  const username = "sawan.patidar@advantal.net"; // Or get it from location state
   console.log("timer",timer)
  useEffect(() => {
    let countdown;
    if (resendDisabled && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
      setTimer(30);
    }
    return () => clearInterval(countdown);
  }, [resendDisabled, timer]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
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
        username,
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

  const handleResend = async () => {
    try {
      setResendDisabled(true);
      await resendSignUpCode({ username });
      alert("OTP resent successfully!");
    } catch (error) {
      console.error("❌ Error resending code:", error);
      alert("Failed to resend OTP. Please try again later.");
      setResendDisabled(false);
    }
  };

  return (
    <div className="Auth-common-bg">
      <div className="container-fluid">
        <div className="row min-vh-100 d-flex align-items-center justify-content-center text-center">
          <div className="modal-content">
            <div className="my-2">
              <h2>OTP Verification</h2>
            </div>
            <div className="my-3">
              <p>
                Please enter the 6-digit OTP sent to your registered:{" "}
                <strong>email</strong>.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "1rem",
              }}
            >
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

            <div className="text-center">
  <Button
    className="w-50"
    onClick={handleSubmit}
    disabled={loading}
    label={loading ? "Verifying..." : "Verify OTP"}
  />
</div>

            <p className="mt-3">
              Didn’t receive the OTP?{" "}
             
              <span
  onClick={!resendDisabled ? handleResend : undefined}
   className="singup-color"
  style={{
     fontSize:"15px",
    textDecoration: "underline",
    cursor: resendDisabled ? "not-allowed" : "pointer",
    opacity: resendDisabled ? 0.5 : 1,
  }}
>
  Resend OTP
</span>

            </p>

            {resendDisabled && <small>Resend available in {timer}s</small>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSignUp;
