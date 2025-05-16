import React, { useState } from "react";
import CommonSignUp from "../CommonSignUp";
import { Link, useNavigate } from "react-router-dom";
import { ApiLoginRequiest } from "../../Axios/ApiRequirest";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from "@mui/material/CircularProgress";

const Register = () => {
  const [registerData, setRegisterData] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordMatch, setPasswordMatch] = useState(true);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRegisterData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === "password" || name === "confirm_password") {
        setPasswordMatch(updatedData.password === updatedData.confirm_password);
      }
      return updatedData;
    });
  };

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!passwordMatch) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await ApiLoginRequiest("user/register", registerData);

      if (response.status === 200) {
        navigate("/verify-email", {
          state: { registerPurpose: "emailVerification" },
        });

        toast.success("successfully register to your account");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisible = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisible = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <form action="" onSubmit={handleRegisterFormSubmit}>
      <div className="flex flex-col lg:flex-row w-full mt-6 pb-7 justify-between">
        <div className="hidden lg:block lg:w-[40%] w-full h-auto">
          <CommonSignUp />
        </div>

        <div className="w-full lg:w-[40%] h-auto m-auto p-4 md:p-8">
          <h1 className="text-2xl font-semibold text-gray-900 text-center md:text-left">
            Sign up
          </h1>
          <p className="text-sm text-gray-500 mt-4 pb-5 text-center md:text-left">
            Join our community and start your learning journey today!
          </p>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>{" "}
            <br />
            <input
              className="border w-full md:w-[60%] shadow p-2 border-gray-500 rounded-lg mt-1"
              type="fullName"
              name="fullName"
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="mt-3">
            <label className="text-sm font-medium text-gray-700">Email</label>{" "}
            <br />
            <input
              className="border w-full md:w-[60%] shadow p-2 border-gray-500 rounded-lg mt-1"
              type="email"
              name="email"
              onChange={handleChange}
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
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <span
              className="absolute top-[440px] right-[410px] cursor-pointer"
              onClick={togglePasswordVisible}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>

          <div className="mt-3">
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>{" "}
            <br />
            <input
              className="border w-full md:w-[60%] shadow p-2 border-gray-500 rounded-lg mt-1"
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              onChange={handleChange}
              placeholder="Confirm your password"
            />
            <span
              className="absolute top-[520px] right-[410px] cursor-pointer"
              onClick={toggleConfirmPasswordVisible}
            >
              {" "}
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
            </span>
          </div>

          <div className="mt-3 w-full md:w-[60%]">
            <Link to="/verify-email">
                </Link>
              <label className="inline-flex items-center text-sm justify-end">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700 text-xs">You agree to the <span className="text-purple-600 font-semibold">Privacy Policy,Terms</span> of Service, and <span className="text-purple-600 font-semibold">Refund Policy.</span></span>
              </label>
          </div>

          <div className="w-full md:w-[60%] mt-4">
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
                  <span>Create Account...</span>
                </div>
              ) : (
                "Create Account"
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
            <Link to="/login">
              <h1 className="text-black text-sm">
                Have an account yet?{" "}
                <span className="text-blue-600 font-semibold">Login</span>
              </h1>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
