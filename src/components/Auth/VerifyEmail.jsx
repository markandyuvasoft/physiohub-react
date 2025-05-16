import React, { useState } from "react";
import CommonSignUp from "../CommonSignUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-on-light.png";
import { ApiLoginRequiest } from "../../Axios/ApiRequirest";
import CircularProgress from "@mui/material/CircularProgress";


const VerifyEmail = () => {
  const navigate = useNavigate();

  const [verifyEmail, setNewVerifyEmail] = useState({});

  // const { state } = useLocation();

  // const purpose = state?.purpose || null;

  const { purpose, forgetPurpose, registerPurpose } =
    useLocation().state || null;

  const [loading, setLoading] = useState(false);

  const handleChangeOtpVerify = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    setNewVerifyEmail((preData) => ({ ...preData, [name]: value }));
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await ApiLoginRequiest("user/verify-email", verifyEmail);

      console.log(response);

      if (response.status === 200) {
        navigate("/verify-otp", {
          state: { verifyEmail, purpose, forgetPurpose, registerPurpose },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleVerifyEmail}>
        <div className="w-full mt-6 pb-7 flex flex-col lg:flex-row justify-between">
          <div className="hidden lg:block lg:w-[40%] w-full h-auto">
            <CommonSignUp />
          </div>

          <div className="w-full lg:w-[60%] h-auto flex justify-center items-center">
            <div className="w-full lg:w-[60%] h-[430px] rounded-2xl shadow-xl p-4 md:p-8">
              <img src={logo} alt="" className="w-[40%] m-auto pt-3" />
              <div className="w-[60%] m-auto flex justify-center">
                <FontAwesomeIcon
                  icon={faMessage}
                  className="text-[#9333EA] text-4xl mt-5"
                />
              </div>
              <h1 className="text-center mt-3 font-semibold text-2xl">
                Please verify your Email
              </h1>
              <p className="text-center mt-2 text-sm text-gray-400">
                We'll send a one-time password (OTP) to your email address
              </p>

              <div className="w-[70%] m-auto flex justify-center mt-5">
                <input
                  type="email"
                  name="email"
                  onChange={handleChangeOtpVerify}
                  placeholder="Please Enter Your Email Address"
                  className="border-2 w-full p-2 rounded-xl border-gray-500"
                />
              </div>
              <p className="mt-2 text-sm text-gray-400 text-center">
                OTP will be sent to this email
              </p>

              <div className="w-[70%] m-auto flex justify-center mt-5">
                <button
                  type="submit"
                  disabled={loading}
                  className={`border-2 w-full p-2 rounded-xl bg-[#9333EA] text-white cursor-pointer ${
                    loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2 justify-center">
                      <CircularProgress size={20} color="inherit" />
                      <span>Send OTP...</span>
                    </div>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;
