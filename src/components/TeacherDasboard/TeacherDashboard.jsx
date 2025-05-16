import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { HiMenu } from "react-icons/hi";

import flash from "../../assets/flash.png";
import quiz from "../../assets/quiz.png";
import dash4 from "../../assets/dash4.png";
import course from "../../assets/course.png";
import dash7 from "../../assets/dash7.png";
import dash5 from "../../assets/dash5.png";
import userimg1 from "../../assets/userimg1.jpg";

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      <div
        className={`bg-white shadow-xl transition-all duration-300  ${
          isSidebarOpen ? "w-[250px]" : "w-0"
        } overflow-hidden`}
      >
        <div className="h-full flex flex-col justify-between pb-6">
          <div>
            <div className="mt-5 space-y-3 pt-3">
              <Link to="/teacherDashboard">
                <SidebarItem icon={dash4} label="Blogs" active />
              </Link>

              <Link to="/teacherDashboard/flashcard">
                <SidebarItem icon={flash} label="Flash Card" />
              </Link>

              <Link to="/teacherDashboard/quiz">
                <SidebarItem icon={quiz} label="Quizs" />
              </Link>

              <Link to="/teacherDashboard/course">
                <SidebarItem icon={course} label="Course" />
              </Link>
              <Link to="/teacherDashboard/lesson">
                <SidebarItem icon={dash5} label="Lessson" />
              </Link>
            </div>
          </div>

          <div className="px-4">
            <div className="flex items-center gap-3 p-3 rounded-xl shadow border hover:bg-[#f6f9fc] cursor-pointer">
              <img
                className="w-[40px] h-[40px] rounded-full"
                src={userimg1}
                alt="User"
              />
              <div>
                <p className="font-semibold text-gray-700">Young Alaska</p>
                <p className="text-gray-400 text-sm">alaska@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-0" : "ml-0"
        }`}
      >
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="text-3xl text-gray-600 hover:text-blue-600"
          >
            <HiMenu />
          </button>
        </div>

        <div className="w-full h-[800px] overflow-y-scroll overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

// Reusable Sidebar Item
const SidebarItem = ({ icon, label }) => {
  return (
    <button className="flex items-center gap-3 w-[90%] mx-auto p-3 rounded-lg hover:bg-[#f6f9fc] transition mt-5">
      <img src={icon} alt={label} className="w-6 h-6 " />
      <span className="text-[16px] font-medium  'text-gray-700 group-hover:text-blue-600 ">
        {label}
      </span>
    </button>
  );
};
