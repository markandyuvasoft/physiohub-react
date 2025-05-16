import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import upload from "../../assets/upload.png";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ApiCreateFormData, ApiGetDetails } from "../../Axios/ApiRequirest";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const TeacherCreateCourse = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const token = localStorage.getItem("loginToken");

  const [loading, setLoading] = useState(false);
  const [allLessons, setAllLessons] = useState([]);

  const [storeLessonId, setLessonId] = useState([]);

  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    coursePrice: "",
    categories: "",
    lesson: [],
    courseDuration: "",
    courseImage: null,
  });

  console.log(storeLessonId, "lessonid");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        courseImage: file,
      }));
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "lesson") {
      setFormData((prev) => {
        if (prev.lesson.includes(value) || value === "") {
          return prev;
        }
        return {
          ...prev,
          lesson: [...prev.lesson, value],
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePublish = async (event) => {
    event.preventDefault();
    setLoading(true);

    const uploadFormData = new FormData();
    uploadFormData.append("courseName", formData.courseName);
    uploadFormData.append("courseDescription", formData.courseDescription);
    uploadFormData.append("coursePrice", formData.coursePrice);
    uploadFormData.append("categories", formData.categories);
   

    uploadFormData.append("courseDuration", formData.courseDuration);

    formData.lesson.forEach((_id) => uploadFormData.append("lesson[]", _id));

    if (formData.courseImage) {
      uploadFormData.append("courseImage", formData.courseImage);
    }

    try {
      const response = await ApiCreateFormData(
        "create-course",
        uploadFormData,
        token
      );
      if (response.status === 200) {
        toast.success("course created successfully");

        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }

        setFormData({
          courseName: "",
          courseDescription: "",
          coursePrice: "",
          categories: "",
          courseDuration: "",
          courseImage: null,
          lesson: [],
        });

        // Clear image preview
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error creating course:", error);
    } finally {
      setLoading(false);
    }
  };

  // for show the all lesson
  useEffect(() => {
    const handleAllLesson = async () => {
      try {
        const response = await ApiGetDetails("found-all-lesson", token);
        if (response?.data?.allLesson) {
          setAllLessons(response.data.allLesson);
        }
      } catch (error) {
        console.error("Failed to fetch lessons:", error);
      }
    };

    handleAllLesson();
  }, [token]);

// select lesson ko remove ke ley
  const handleRemoveLesson = (id) => {
  setFormData((prev) => ({
    ...prev,
    lesson: prev.lesson.filter((l) => l !== id),
  }));
};

  return (
    <div>
      <div className="flex items-center gap-1 mt-3 pl-6 cursor-pointer justify-between w-[95%]">
        <Link to={"/teacherDashboard/course"}>
          <div className="flex items-center gap-2">
            <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
            <h1 className="font-bold text-2xl text-[#191925]">Course</h1>
          </div>
        </Link>

        <div className="w-[25%]  gap-2 flex justify-start">
          <button
            onClick={handlePublish}
            type="submit"
            disabled={loading}
            className={`w-[50%] p-2.5 rounded-xl bg-[#7240FD] text-white cursor-pointer ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2 justify-center">
                <CircularProgress size={20} color="inherit" />
                <span>Publish...</span>
              </div>
            ) : (
              "Publish"
            )}
          </button>
        </div>
      </div>

      <form action="">
        <div className="w-[90%] m-auto mt-10 p-6  rounded-lg shadow-md pb-20">
          <h1 className="text-2xl font-bold text-[#191925]">
            Create New Course
          </h1>

          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">Title</h1>
            <input
              type="text"
              name="courseName"
              id="courseName"
              value={formData.courseName ? formData.courseName : ""}
              onChange={handleChange}
              placeholder="Write question here"
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg "
            />
          </div>

          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              Description <span className="text-xs">(max 150 words)</span>
            </h1>
            <input
              type="text"
              name="courseDescription"
              id="courseDescription"
              value={
                formData.courseDescription ? formData.courseDescription : ""
              }
              onChange={handleChange}
              placeholder="Enter short description here"
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg "
            />
          </div>

          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              Categories
            </h1>
            <span className="text-xs">
              Type Categories Seperated by coma ","{" "}
            </span>
            <input
              type="text"
              name="categories"
              id="categories"
              value={formData.categories ? formData.categories : ""}
              onChange={handleChange}
              placeholder="e.g. Orthopedic, Neurological, Pediatric "
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg"
            />
          </div>

          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              Course Price
            </h1>

            <input
              type="number"
              name="coursePrice"
              id="coursePrice"
              value={formData.coursePrice ? formData.coursePrice : ""}
              onChange={handleChange}
              placeholder="Enter price"
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg"
            />
          </div>
          {/* 
          <div className="flex gap-6 mt-6">
            <div className="w-1/2">
              <h1 className="text-[#191925] font-lg font-semibold mb-2">
                Total Lessons
              </h1>
              <input
                type="number"
                name="total_number_of_lesson"
                id="total_number_of_lesson"
                value={
                  formData.total_number_of_lesson
                    ? formData.total_number_of_lesson
                    : ""
                }
                onChange={handleChange}
                placeholder="Enter total_number_of_lesson"
                className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg"
              />
            </div>

            <div className="w-1/2">
              <h1 className="text-[#191925] font-lg font-semibold mb-2">
                Total Quiz
              </h1>
              <input
                type="number"
                name="total_number_of_quize"
                id="total_number_of_quize"
                value={
                  formData.total_number_of_quize
                    ? formData.total_number_of_quize
                    : ""
                }
                onChange={handleChange}
                placeholder="Enter total_number_of_quize"
                className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg"
              />
            </div>
          </div> */}

          <div className="flex gap-6 mt-6">
            <div className="w-1/2">
              <h1 className="text-[#191925] font-lg font-semibold mb-2">
                Lessons
              </h1>

              <select
                name="lesson"
                onChange={handleChange}
                className="border-2 w-full p-2 border-gray-300 rounded-lg"
                value="" 
              >
                <option value="">Select a lesson</option>
                {allLessons
                  .filter((lesson) => !formData.lesson.includes(lesson._id))
                  .map((lesson) => (
                    <option key={lesson._id} value={lesson._id}>
                      {lesson.lessonName}
                    </option>
                  ))}
              </select>

              {/* Show selected lessons with cross buttons */}
              {formData.lesson.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.lesson.map((lessonId) => {
                    const lesson = allLessons.find((l) => l._id === lessonId);
                    return (
                      <span
                        key={lessonId}
                        className="flex items-center gap-1 bg-gray-200 text-sm px-3 py-1 rounded-full"
                      >
                        {lesson?.lessonName || "Unknown"}
                        <button
                          type="button"
                          onClick={() => handleRemoveLesson(lessonId)}
                          className="text-red-600 hover:text-red-800 ml-1 font-bold cursor-pointer"
                        >
                          x
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="w-1/2">
              <h1 className="text-[#191925] font-lg font-semibold mb-2">
                Quizzes
              </h1>
              <select className="border-2 w-full p-2 border-gray-300 rounded-lg">
                <option value="">Select number of quizzes</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              Estimated Duration <span className="text-xs">(in Minutes)</span>
            </h1>
            <input
              type="text"
              id="courseDuration"
              name="courseDuration"
              value={formData.courseDuration ? formData.courseDuration : ""}
              onChange={handleChange}
              placeholder="Write Estimated Duration"
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg "
            />
          </div>

          <h2 className="text-[#191925] font-lg font-semibold mt-3">
            Cover Image
          </h2>

          <div className="border-2 w-full h-[250px] border-gray-300 border-dashed mr-40 flex justify-center items-center mt-3">
            {!imagePreview ? (
              <label>
                <input
                  type="file"
                  accept="image/*"
                  value={formData.courseImage ? formData.courseImage : null}
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="text-center">
                  <img
                    className="m-auto mt-19"
                    src={upload}
                    alt="Upload Icon"
                  />
                  <h1 className="text-[#191925] font-semibold mt-2">
                    Drag or drop image here
                  </h1>
                  <p className="text-[#8996A9] pr-3 pl-3">
                    Image should be horizontal, at least 1500 x 500 px
                  </p>
                </div>
              </label>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={imagePreview}
                  alt="Selected Cover"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default TeacherCreateCourse;
