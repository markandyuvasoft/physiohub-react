import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import flash from "../../assets/flash.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FaBell } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  ApiDeleteParamsDetails,
  ApiGetDetails,
} from "../../Axios/ApiRequirest";
import { toast } from "react-toastify";

const TeacherLesson = () => {
  const navigate = useNavigate();

  const [lesson, setAllLesson] = useState([]);

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("loginToken");

  const [showModal, setShowModal] = useState(false);

  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    const handleGetCourse = async () => {
      setLoading(true);

      try {
        const response = await ApiGetDetails("found-all-lesson", token);
        setAllLesson(response?.data?.allLesson);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    handleGetCourse();
  }, []);

  const handleDeleteCourse = async (e) => {
    e.preventDefault();

    if (selectedCourseId) {
      try {
        const response = await ApiDeleteParamsDetails(
          "delete-lesson",
          token,
          selectedCourseId
        );
        if (response.status === 200) {
          toast.success("lesson deleted successfully");
          setShowModal(false);
          setAllLesson((prevCourse) =>
            prevCourse.filter((lesson) => lesson._id !== selectedCourseId)
          );
          selectedCourseId(null);
        }
      } catch (error) {
        console.error("Error deleting lesson:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="loader border-4 border-blue-300 border-t-transparent rounded-full w-12 h-12 animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading Lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-1 mt-3 pl-6 cursor-pointer justify-between">
        <div>
          <h1 className="font-bold text-2xl text-[#191925]">Lesson</h1>
        </div>

        <div className="w-[35%] flex gap-2">
          <button className="w-[30%] p-2.5 rounded-xl bg-[#E2E8F0] text-black cursor-pointer">
            Featured
          </button>

          <button
            className="w-[30%] p-2.5 rounded-xl bg-[#7240FD] text-white cursor-pointer"
            onClick={() => navigate("/teacherDashboard/createLesson")}
          >
            + Create new
          </button>
        </div>
      </div>

      {lesson.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <div className="w-25 h-25 rounded-full overflow-hidden bg-[#EEF2F6]  flex items-center justify-center">
            <img src={flash} alt="flash" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-[#191925]">
            No Lesson Found
          </h1>
          <p className="text-sm text-gray-400 mt-2 text-center">
            You haven't posted any Lesson yet. Start by creating your first one!
          </p>
        </div>
      ) : (
        <div className="w-[90%] mx-auto h-full shadow-lg rounded-lg mt-12 pb-20 ">
          {/* Show on blog details */}
          <div>
            {lesson?.map((lesson, index) => (
              <div
                key={index}
                className="border-b-2 border-dotted w-full p-6 md:p-10 mx-auto"
              >
                <div className="w-full flex flex-col md:flex-row items-start justify-between gap-6">
                  <div className="md:w-1/4 w-full">
                    <Carousel
                      autoPlay
                      infiniteLoop
                      showThumbs={false}
                      showStatus={false}
                      interval={3000}
                      showArrows={false}
                    >
                      {lesson.content?.contentImage && (
                        <img
                          className="w-full h-full object-cover rounded-md"
                          src={lesson.content.contentImage}
                          alt={lesson.content.contentImage}
                        />
                      )}
                      {lesson.content?.contentVideo && (
                        <video
                          className="w-full h-full object-cover rounded-md"
                          src={lesson.content.contentVideo}
                          controls
                        />
                      )}
                    </Carousel>
                  </div>

                  <div className="flex-1">
                    <h1 className="text-[14px] md:text-xl text-[#4297FB] font-semibold text-start">
                      {lesson.lessonName}
                    </h1>
                    <p className="mt-2 font-medium text-[16px] text-[#191925] text-start">
                      {lesson.lessonDescription}
                    </p>
                    <div className="flex items-center flex-wrap gap-2 mt-4">
                      <div className="flex items-center gap-2">
                        <FaBell />
                        <p className="text-md text-[#495D79] font-medium">
                          {lesson.averageDuration}
                        </p>
                      </div>
                    </div>{" "}
                    <div className="flex items-center gap-2 mt-3">
                      <SlCalender className="w-5 h-5 text-gray-500" />
                      <p className="text-sm text-[#495D79] font-medium">
                        {new Date(lesson.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-4 mt-4 md:mt-0">
                    <span className="border-2 p-2.5 rounded-xl border-gray-300 cursor-pointer">
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-[#495D79] cursor-pointer hover:scale-110 transition-transform text-2xl md:text-xl"
                      />
                    </span>

                    <span className="border-2 p-2.5 rounded-xl border-gray-300 cursor-pointer">
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => {
                          setSelectedCourseId(lesson._id);
                          setShowModal(true);
                        }}
                        className="text-[#495D79] cursor-pointer hover:scale-110 transition-transform text-2xl md:text-xl"
                      />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showModal && (
            <form action="" onSubmit={handleDeleteCourse}>
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    Are you sure you want to delete?
                  </h2>
                  <div className="flex justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 border border-gray-300 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherLesson;
