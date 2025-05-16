import React, { useState } from "react";
import CommonSignUp from "../CommonSignUp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-on-light.png";
import { ApiLoginRequiest } from "../../Axios/ApiRequirest";
import CircularProgress from "@mui/material/CircularProgress";


const VerifyOtp = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from || "verify-email";

  const [otp, setOtp] = useState(Array(6).fill(""));

  const { verifyEmail, purpose, forgetPurpose, registerPurpose } =
    useLocation().state;

  const [loading, setLoading] = useState(false);

  // console.log(verifyEmail, purpose,forgetPurpose,registerPurpose, "00000000000000000000000000");

  const handleOtpChange = (e, index) => {
    const { value, nextElementSibling, previousElementSibling } = e.target;

    if (value && nextElementSibling) {
      nextElementSibling.focus();
    } else if (!value && previousElementSibling) {
      previousElementSibling.focus();
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fullOtp = otp.join("");
      const response = await ApiLoginRequiest("user/verify-otp", {
        otp: fullOtp,
        email: verifyEmail?.email,
        purpose: purpose || forgetPurpose || registerPurpose,
      });

      if (response.status === 200) {
        if (response?.data?.isEmail_verification === true) {
          navigate("/login");
        } else if (response?.data?.isForget === true) {
          navigate("/change-password");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmitOtp}>
      <div className="w-full mt-6 pb-7 flex flex-col lg:flex-row justify-between">
        <div className="hidden lg:block lg:w-[40%] w-full h-auto">
          <CommonSignUp />
        </div>

        <div className="w-full lg:w-[60%] flex justify-center items-center p-6">
          <div className="bg-white w-full max-w-md lg:max-w-lg rounded-2xl shadow-xl p-8">
            <div className="flex justify-center">
              <img src={logo} alt="Logo" className="w-32 h-auto" />
            </div>
            <h1 className="text-center mt-6 font-semibold text-2xl text-gray-800">
              Verify OTP
            </h1>
            <p className="text-center mt-2 text-sm text-gray-500">
              Enter the OTP sent to your registered email or phone number.
            </p>

            <div className="mt-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your Email"
                  value={verifyEmail?.email}
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mt-8">
                <div className="flex space-x-4 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  ))}
                </div>

                <div className="block w-full mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      loading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2 justify-center">
                        <CircularProgress size={20} color="inherit" />
                        <span>Submit...</span>
                      </div>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                  Didn't receive the OTP?{" "}
                  <Link
                    to="/verify-email"
                    className="text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Resend OTP
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default VerifyOtp;
