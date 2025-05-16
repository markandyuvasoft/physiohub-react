import React, { useState } from "react";
import { Link } from "react-router-dom";
import upload from "../../assets/upload.png";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ApiCreateFormData } from "../../Axios/ApiRequirest";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const TeacherCreateLesson = () => {
  const token = localStorage.getItem("loginToken");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    lessonName: "",
    lessonDescription: "",
    lessonTopic: "",
    averageDuration: "",
    lessonNumber: "",
    contentText: "",
  });



  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handlePublish = async (event) => {
    event.preventDefault();
    setLoading(true);

    const uploadFormData = new FormData();
    uploadFormData.append("lessonName", formData.lessonName);
    uploadFormData.append("lessonDescription", formData.lessonDescription);
    uploadFormData.append("lessonTopic", formData.lessonTopic);
    uploadFormData.append("averageDuration", formData.averageDuration);
    uploadFormData.append("lessonNumber", formData.lessonNumber);
    uploadFormData.append("content[contentText]", formData.contentText);

    if (imageFile) {
      uploadFormData.append("content[contentImage]", imageFile);
    }
    if (videoFile) {
      uploadFormData.append("content[contentVideo]", videoFile);
    }

    try {
      const response = await ApiCreateFormData(
        "create-lesson",
        uploadFormData,
        token
      );
      if (response.status === 200) {
        toast.success("Lesson created successfully");

        setFormData({
          lessonName: "",
          lessonDescription: "",
          lessonTopic: "",
          averageDuration: "",
          lessonNumber: "",
          contentText: "",
        });
        setImagePreview(null);
        setVideoPreview(null);
        setImageFile(null);
        setVideoFile(null);
      }
    } catch (error) {
      console.error("Error creating lesson:", error);
      toast.error("Failed to create lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-1 mt-3 pl-6 cursor-pointer justify-between w-[95%]">
        <Link to={"/teacherDashboard/lesson"}>
          <div className="flex items-center gap-2">
            <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
            <h1 className="font-bold text-2xl text-[#191925]">Lesson</h1>
          </div>
        </Link>

        <div className="w-[25%] gap-2 flex justify-start">
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

      <form>
        <div className="w-[90%] m-auto mt-10 p-6 rounded-lg shadow-md pb-20">
          <h1 className="text-2xl font-bold text-[#191925]">
            Create New Lesson
          </h1>

          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              Lesson Name
            </h1>
            <input
              type="text"
              name="lessonName"
              id="lessonName"
              value={formData.lessonName}
              onChange={handleChange}
              placeholder="Write Lesson Name here"
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg"
            />
          </div>

          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              Description <span className="text-xs">(max 150 words)</span>
            </h1>
            <input
              type="text"
              name="lessonDescription"
              id="lessonDescription"
              value={formData.lessonDescription}
              onChange={handleChange}
              placeholder="Enter short description here"
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg"
            />
          </div>

          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              Average Duration
            </h1>

            <input
              type="text"
              name="averageDuration"
              id="averageDuration"
              value={formData.averageDuration}
              onChange={handleChange}
              placeholder="Enter Average Duration"
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg"
            />
          </div>

          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              Content Text
            </h1>
            <textarea
              name="contentText"
              id="contentText"
              value={formData.contentText}
              onChange={handleChange}
              placeholder="Enter content text here"
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg"
            />
          </div>

          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              Lesson Topic
            </h1>
            <input
              type="text"
              name="lessonTopic"
              id="lessonTopic"
              value={formData.lessonTopic}
              onChange={handleChange}
              placeholder="Enter lesson topics"
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg"
            />
          </div>

          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              lesson Number
            </h1>
            <input
              type="number"
              id="lessonNumber"
              name="lessonNumber"
              value={formData.lessonNumber}
              onChange={handleChange}
              placeholder="Write lesson Number"
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg "
            />
          </div>

          <div className="w-full m-auto mt-6">
            <h2 className="text-[#191925] font-lg font-semibold mt-3">
              Cover Image
            </h2>
            <div className="border-2 w-full h-[250px] border-gray-300 border-dashed flex justify-center items-center mt-3">
              {!imagePreview ? (
                <label>
                  <input
                    type="file"
                    accept="image/*"
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

          <div className="w-full m-auto mt-6">
            <h2 className="text-[#191925] font-lg font-semibold mt-3">
              Cover Video
            </h2>
            <div className="border-2 w-full h-[250px] border-gray-300 border-dashed flex justify-center items-center mt-3">
              {!videoPreview ? (
                <label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="hidden"
                  />
                  <div className="text-center">
                    <img
                      className="m-auto mt-19"
                      src={upload}
                      alt="Upload Icon"
                    />
                    <h1 className="text-[#191925] font-semibold mt-2">
                      Drag or drop video here
                    </h1>
                  </div>
                </label>
              ) : (
                <div className="relative w-full h-full">
                  <video
                    src={videoPreview}
                    alt="Selected Video"
                    className="w-full h-full object-cover"
                    controls
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TeacherCreateLesson;
