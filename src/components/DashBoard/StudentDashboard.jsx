import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';

import dash1 from "../../assets/dash1.png";
import dash2 from "../../assets/dash2.png";
import quiz from "../../assets/quiz.png";
import flash from "../../assets/flash.png";
import course from "../../assets/course.png";
import blg from "../../assets/blg.png";




import discover from "../../assets/discover.png";
import setting from "../../assets/setting.png";
import userimg1 from "../../assets/userimg1.jpg";

const StudentDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(prev => !prev);
    };

    return (
        <div className="flex">

            <div
                className={`bg-white shadow-xl transition-all duration-300  ${isSidebarOpen ? 'w-[250px]' : 'w-0'} overflow-hidden`} >
                <div className="h-full flex flex-col justify-between pb-6">

                    <div>
                        <div className="mt-5 space-y-3 pt-3">
                            <Link to="/studentDashboard">
                                <SidebarItem icon={dash1} label="My Dashboard" active />
                            </Link>
                            <Link to={"/studentDashboard/blogs"}>
                                <SidebarItem icon={blg} label="Blog" />
                            </Link>
                           
                            <Link to={"/studentDashboard/discover"}>
                                <SidebarItem icon={discover} label="Discover" />
                            </Link>

                            <Link to={"/studentDashboard/quiz"}>
                            <SidebarItem icon={quiz} label="Quiz" />
                            </Link>

                            <Link to={"/studentDashboard/flashcard"}>
                            <SidebarItem icon={flash} label="FlashCards" />
                            </Link>

                            <Link to={"/studentDashboard/course"}>
                            <SidebarItem icon={course} label="Course" />
                            </Link>
                            

                            <Link to="/studentDashboard/settings">
                                <SidebarItem icon={setting} label="Settings" />
                            </Link>

                        </div>
                    </div>

                    <div className="px-4">
                        <div className="flex items-center gap-3 p-3 rounded-xl shadow border hover:bg-[#f6f9fc] cursor-pointer">
                            <img className="w-[40px] h-[40px] rounded-full" src={userimg1} alt="User" />
                            <div>
                                <p className="font-semibold text-gray-700">Young Alaska</p>
                                <p className="text-gray-400 text-sm">alaska@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0'}`}>

                <div className="p-4">
                    <button onClick={toggleSidebar} className="text-3xl text-gray-600 hover:text-blue-600">
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

export default StudentDashboard;

// Reusable Sidebar Item
const SidebarItem = ({ icon, label, quiz2 }) => {
    return (
        <button className="flex items-center gap-3 w-[90%] mx-auto p-3 rounded-lg hover:bg-[#f6f9fc] transition mt-5 cursor-pointer">
            <img src={icon} alt={label} className="w-6 h-6 " />
            <span className="text-[16px] font-medium  'text-gray-700 group-hover:text-blue-600 ">
                {label}
            </span>
        </button>
    );
};
