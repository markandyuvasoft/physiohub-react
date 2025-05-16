import React, { useState } from "react";
import upload from "../../assets/upload.png";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const TeacherCreateQuiz = () => {
  const [image, setImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "cover") {
          setImage(reader.result);
        } else if (type === "thumbnail") {
          setThumbnail(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = (event) => {
    event.preventDefault();
    alert("Form submitted");
  };

  return (
    <div>
      <div className="flex items-center gap-1 mt-3 pl-6 cursor-pointer justify-between">
        <Link to={"/teacherDashboard/quiz"}>
          <div className="flex items-center gap-2">
            <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
            <h1 className="font-bold text-2xl text-[#191925]">Quiz</h1>
          </div>
        </Link>

        <div className="w-[35%] flex gap-2">
          <button
            className="w-[30%] p-2.5 rounded-xl border-2 border-purple-600 text-purple-600 cursor-pointer font-semibold"
            onClick={handlePublish}
          >
            Save as Draft
          </button>

          <button
            type="submit"
            className="w-[30%] p-2.5 rounded-xl bg-[#7240FD] text-white cursor-pointer"
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>

      <div className="w-[90%] m-auto mt-10 p-6  rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-[#191925]">Create New Quiz</h1>

        <div className="w-full m-auto mt-6">
          <h1 className="text-[#191925] font-lg font-semibold mt-3">
            Quiz Title
          </h1>
          <input
            type="text"
            placeholder="Enter quiz title"
            className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg "
          />
        </div>

        <div className="flex gap-2">
          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              Start Date
            </h1>
            <input
              type="date"
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg "
            />
          </div>
          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              End Date
            </h1>
            <input
              type="date"
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg "
            />
          </div>
        </div>

        <h2 className="pt-12 font-semibold text-xl">Cover</h2>

        <div className="border-2 w-full h-[250px] border-dashed mr-40 flex justify-center items-center mt-3">
          {!image ? (
            <label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "cover")}
                className="hidden"
              />
              <div className="text-center">
                <img className="m-auto mt-19" src={upload} alt="Upload Icon" />
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
                src={image}
                alt="Selected Cover"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="w-[50%]  mt-6">
          <h1 className="text-[#191925] font-lg font-semibold mt-3">
            Category
          </h1>
          <input
            type="text"
            placeholder="Choose Category"
            className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg "
          />
        </div>

        <div className="w-full m-auto mt-6">
          <h1 className="text-[#191925] font-lg font-semibold mt-3">
            Short Description
          </h1>
          <input
            type="text"
            placeholder="Enter short description here"
            className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg "
          />
        </div>

        <div className="w-full m-auto mt-6">
          <h1 className="text-[#191925] font-lg font-semibold mt-3">Content</h1>
          <textarea
            type="text"
            placeholder="Write your content here...."
            className="border-2 w-full p-5 mt-2 border-gray-300 rounded-lg "
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherCreateQuiz;
