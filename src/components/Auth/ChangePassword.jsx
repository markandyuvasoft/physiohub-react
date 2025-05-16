import React, { useState } from "react";
import CommonSignUp from "../CommonSignUp";
import logo from "../../assets/logo-on-light.png";
import { ApiLoginRequiest } from "../../Axios/ApiRequirest";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [resetPassword, setNewResetPassword] = useState({});

  const [loading, setLoading] = useState(false);

  const handleResetPassword = (e) => {
    const name = e.target.name;

    const value = e.target.value;

    setNewResetPassword((preData) => ({ ...preData, [name]: value }));
  };

  const handleSubmitResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await ApiLoginRequiest(
        "user/reset-password",
        resetPassword
      );

      // console.log(response);

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action="" onSubmit={handleSubmitResetPassword}>
      <div className="w-full mt-6 pb-7 flex flex-col lg:flex-row justify-between">
        <div className="hidden lg:block lg:w-[40%] w-full h-auto">
          <CommonSignUp />
        </div>

        <div className="w-full lg:w-[60%] flex justify-center items-center">
          <div className="w-[80%] lg:w-[60%] pb-7 rounded-2xl shadow-xl p-6">
            <img src={logo} alt="Logo" className="w-[40%] m-auto pt-5" />

            <h1 className="text-center mt-5 font-semibold text-2xl">
              Create New Password
            </h1>

            <div className="w-[80%] lg:w-[70%] m-auto flex justify-center mt-15">
              <div className="w-full">
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleResetPassword}
                    id="email"
                    placeholder="Enter Email"
                    className="border-2 w-full p-2 mt-2 rounded-xl border-gray-500"
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    onChange={handleResetPassword}
                    id="newPassword"
                    placeholder="Enter Password"
                    className="border-2 w-full p-2 mt-2 rounded-xl border-gray-500"
                  />
                </div>
              </div>
            </div>

            <div className="w-[80%] lg:w-[40%] m-auto flex justify-center mt-5">
              <button
                type="submit"
                disabled={loading}
                className={`border-2 w-full p-2 mt-5 rounded-xl bg-[#9333EA] text-white cursor-pointer ${
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
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
