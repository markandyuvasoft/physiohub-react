import React, { useState } from "react";
import CommonSignUp from "../CommonSignUp";
import { Link, useNavigate } from "react-router-dom";
import StepperComponent from "../StepperComponent";
import { ApiLoginRequiest, ApiPostAttendance } from "../../Axios/ApiRequirest";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setNewLoginData] = useState({});

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleChangeLogin = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await ApiLoginRequiest("user/login", loginData);

      // console.log(response);

      if (response.status === 200) {
        toast.success("login successfully");

        const token = response.data.token;
        const role = response.data.role;

        const authId = response.data.authId;

        const responseAttendance = await ApiPostAttendance(
          "user/attendance",
          token
        );

        console.log("post attendance", responseAttendance);

        localStorage.setItem("loginToken", token);

        localStorage.setItem("role", role);

        localStorage.setItem("loginId", authId);

        navigate("/");
      }
    } catch (error) {
      if (
        error?.response?.data?.message === "Please verify your email address."
      ) {
        navigate("/verify-email", { state: { purpose: "emailVerification" } });
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisible = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmitLogin}>
        <div className="w-full mt-6 pb-7 flex flex-col lg:flex-row justify-between">
          <div className="hidden lg:block lg:w-[40%] w-full h-auto">
            <CommonSignUp />
          </div>

          <div className="pt-5 w-full lg:w-[40%] h-auto m-auto p-4 md:p-8">
            <h1 className="text-xl font-bold text-gray-900 mt-20">
              Login to Your Account
            </h1>
            <p className="text-sm text-gray-500 mt-4 pb-5">
              Access your personalized dashboard by logging into your account.
            </p>

            <div className="mt-3">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>{" "}
              <br />
              <input
                className="border-1 w-full md:w-[60%] shadow p-1.5 border-gray-500 rounded-lg mt-1"
                type="email"
                name="email"
                onChange={handleChangeLogin}
                placeholder="Enter your email"
              />
            </div>

            <div className="mt-3">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>{" "}
              <br />
              <input
                className="border w-full md:w-[60%] shadow p-2 border-gray-500 rounded-lg mt-1"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChangeLogin}
                placeholder="Enter your password"
              />
              <span
                className="absolute top-[483px] right-[410px] cursor-pointer"
                onClick={togglePasswordVisible}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>

            <div className="mt-3 w-full md:w-[60%]">
              <button
                type="button"
                onClick={() =>
                  navigate("/verify-email", {
                    state: { forgetPurpose: "passwordReset" },
                  })
                }
                className="text-sm text-blue-600 font-semibold text-right cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <div className="w-full md:w-[60%] mt-2">
              <button
                type="submit"
                disabled={loading}
                className={`border-2 w-full p-2 bg-[#9333EA] text-white font-semibold rounded-xl cursor-pointer ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2 justify-center">
                    <CircularProgress size={20} color="inherit" />
                    <span>Login...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>

            <hr className="w-full md:w-[60%] border-1 mt-3 border-gray-300" />

            <div className="w-full md:w-[60%] mt-5">
              <button className="border-2 border-gray-200 w-full p-2 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all">
                Continue with Google
              </button>
            </div>

            <div className="w-full md:w-[60%] mt-3 text-center">
              <Link to="/register">
                <h1 className="text-black text-sm">
                  Don't have an account yet?{" "}
                  <span className="text-blue-600 font-semibold">Sign up</span>
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
