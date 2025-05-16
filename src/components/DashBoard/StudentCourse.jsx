import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import flash from "../../assets/flash.png";
import upload from "../../assets/upload.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import signup1 from "../../assets/signup1.png";
import physio from "../../assets/physio.png";
import flash2 from "../../assets/flash2.png";
import flash3 from "../../assets/flash3.png";
import { ApiGetDetails } from "../../Axios/ApiRequirest";
import { BiCategoryAlt } from "react-icons/bi";

function StudentCourse() {
  const navigate = useNavigate();

  const [course, setAllCourse] = useState([]);

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("loginToken");

  useEffect(() => {
    const handleGetCourse = async () => {
      setLoading(true);

      try {
        const response = await ApiGetDetails("found-all-course", token);
        setAllCourse(response?.data?.allCourses);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    handleGetCourse();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="loader border-4 border-blue-300 border-t-transparent rounded-full w-12 h-12 animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-1 mt-3 pl-6 cursor-pointer justify-between">
        <div>
          <h1 className="font-bold text-2xl text-[#191925]">Course</h1>
        </div>
      </div>

      {course.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <div className="w-25 h-25 rounded-full overflow-hidden bg-[#EEF2F6]  flex items-center justify-center">
            <img src={flash} alt="flash" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-[#191925]">
            No Courses Found
          </h1>
          <p className="text-sm text-gray-400 mt-2 text-center">
            You haven't posted any Course yet. Start by creating your first one!
          </p>
        </div>
      ) : (
        <div className="w-[90%] mx-auto h-full shadow-lg rounded-lg mt-12 pb-20 ">
          {/* Show on course details */}
          <div>
            {course?.map((course, index) => (
              <div
                key={index}
                className="border-b-2 border-dotted w-full p-6 md:p-10 mx-auto"
              >
                <div className="w-full flex flex-col md:flex-row items-start justify-between gap-6">
                  <div className="md:w-1/4 w-full h-[200px]">
                    <img
                      className="w-full h-full object-cover rounded-md"
                      src={course.courseImage}
                      alt={course.courseImage}
                    />
                  </div>

                  <div className="flex-1">
                    <h1 className="text-[14px] md:text-xl text-[#4297FB] font-semibold text-start">
                      {course.courseName}
                    </h1>
                    <p className="mt-2 font-medium text-[20px] text-[#191925] text-start">
                      {course.courseDescription}
                    </p>

                    <div className="flex items-center flex-wrap gap-2 mt-4">
                      <div className="flex items-center gap-2">
                       
                        <div className="flex flex-wrap gap-2 mt-2">
                          {course.lesson.map((lesson) => (
                            <span
                              key={lesson._id}
                              className="flex items-center gap-1 bg-gray-200 text-sm px-3 py-1 rounded-full"
                            >
                              {lesson.lessonName}
                            </span>
                          ))}
                        </div>
                      </div>

                      <span className="text-lg text-[#B4BBCD] font-medium mt-3">
                        ·
                      </span>

                      <div className="flex items-center">
                        
                        <p className="text-md text-[#495D79] font-medium flex items-center gap-1 mt-3">
                          {course.isFree === false ? (
                            <>
                              <span className="text-green-600">🟢 Free</span>
                            </>
                          ) : (
                            <>
                              <span className="text-red-500">🔒 Paid</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      {" "}
                      <BiCategoryAlt className="w-5 h-5" />
                      <p className="font-semibold ">{course.categories}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentCourse;
