import React, { useEffect, useState } from "react";
import logo from "../assets/logo-on-light.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ApiGetDetails } from "../Axios/ApiRequirest";

const NavBar = ({
  scrollToAbout,
  scrollToFeatures,
  scrollToFaq,
  scrollToCourses,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [token, setNewToken] = useState(localStorage.getItem("loginToken"));

  const [loginRole, setNewLoginRole] = useState(localStorage.getItem("role"));

  const [loginData, setLoginData] = useState({});

  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const storeToken = localStorage.getItem("loginToken");
    setNewToken(storeToken);
  }, [token]);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setNewLoginRole(storedRole);
  }, []);

  useEffect(() => {
    const handleLoginDetails = async () => {
      if (!token) return; 
      try {
        const response = await ApiGetDetails("user/found-auth-details", token);
        console.log(response.data, "nav login data");
        setLoginData(response.data);
      } catch (error) {
        console.error("Failed to fetch login data:", error);
      }
    };
  
    handleLoginDetails();
  }, [token]); 
  

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("role");
    localStorage.removeItem("loginId");

    setNewToken(null);

    setNewLoginRole(null);

    navigate("/login");
  };

  return (
    <div>
      <div className="w-full h-[80px] bg-white flex justify-between items-center px-4 shadow-md">
        <div className="w-[40%] sm:w-[30%] md:w-[20%]">
          <Link to={"/"}>
            <img
              className="w-[70%] sm:w-[60%] md:w-[50%] m-auto"
              src={logo}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="hidden md:flex w-[40%]">
          <ul className="flex justify-between items-center w-full text-[#364153] font-semibold gap-4">
            {token ? (
              <>
                <li
                  className="hover:text-purple-600 cursor-pointer text-gray-700"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <li
                  onClick={scrollToAbout}
                  className="hover:text-purple-600 cursor-pointer text-gray-500"
                >
                  About us
                </li>
                <li
                  onClick={scrollToFeatures}
                  className="hover:text-purple-600 cursor-pointer text-gray-500"
                >
                  Features
                </li>
                <li
                  onClick={scrollToFaq}
                  className="hover:text-purple-600 cursor-pointer text-gray-500"
                >
                  FAQ
                </li>
                <li
                  onClick={scrollToCourses}
                  className="hover:text-purple-600 cursor-pointer text-gray-500"
                >
                  Courses
                </li>
                <li>
                  <Link
                    to="/register"
                    className="border border-purple-600 text-[#9810fa] font-semibold px-3 py-2 rounded-xl hover:bg-purple-100 text-sm cursor-pointer"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="border border-purple-600 text-[#9810fa] font-semibold px-3 py-2 rounded-xl hover:bg-purple-100 text-sm cursor-pointer"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="hidden md:flex items-center gap-3  mr-20">
          {loginRole === "Student" ? (
            <Link to="/studentDashboard">
              <button className="border border-purple-600 text-[#9810fa] font-semibold px-3 py-2 rounded-xl hover:bg-purple-100 text-sm cursor-pointer">
                {loginData?.authDetails?.firstName || "Student"}
              </button>
            </Link>
          ) : loginRole === "Teacher" ? (
            <Link to="/teacherDashboard">
              <button className="border border-purple-600 text-[#9810fa] font-semibold px-3 py-2 rounded-xl hover:bg-purple-100 text-sm cursor-pointer">
                {loginData?.authDetails?.firstName || "Teacher"}
              </button>
            </Link>
          ) : null}

          {loginData?.authDetails?.profileImage ? (
            <img
              src={loginData.authDetails.profileImage}
              alt="User Profile"
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
          ) : (
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              className="text-[#9810fa]"
            />
          )}
        </div>

        <div className="md:hidden">
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faBars}
            size="lg"
            onClick={toggleMenu}
            className="text-[#9810fa] cursor-pointer"
          />
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-4  px-4 py-5 bg-white shadow-md text-[#364153] font-semibold">
          <ul className="flex flex-col gap-2">
            <li className="hover:text-purple-600 cursor-pointer text-gray-700">register</li>
            <li className="hover:text-purple-600 cursor-pointer text-gray-700">login</li>
            <li className="hover:text-purple-600 cursor-pointer text-gray-700">About Us</li>
            <li className="hover:text-purple-600 cursor-pointer text-gray-700">Contact</li>
          </ul>
          <div className="flex flex-col gap-2">
            <Link to={"/studentDashboard"}>
              <button className="border border-purple-600 text-[#9810fa] font-semibold px-3 py-2 rounded-xl hover:bg-purple-100 text-sm">
                Student
              </button>
            </Link>
            <button className="border border-purple-600 text-[#9810fa] font-semibold px-3 py-2 rounded-xl hover:bg-purple-100 text-sm">
              Teacher
            </button>
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              className="text-[#9810fa]"
            />
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default NavBar;
