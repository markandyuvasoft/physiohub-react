import React, { useEffect, useState } from "react";
import upload from "../../assets/upload.png";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import front from "../../assets/front.png"
import { ImCross } from "react-icons/im";

import {
  ApiCreateFormData,
  ApiGetDetails,
  ApiLoginRequiest,
  ApiPostWithToken,
} from "../../Axios/ApiRequirest";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const TeacherCreateFlashCard = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [topicFlashName, setNewtopicFlashName] = useState("");
  const [getFlashTopics, setNewFlashTopics] = useState([]);
  const [getFlashLevel, setNewFlashLevel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [backImagePreview, setBackImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hint: "",
    subject: "",
    masteryLevel: "",
    confidance_level: "",
    flash_topics: "",
    flashImage: null,
    frontTitle: "",
    backTitle: "",
    frontImage: null,
    backImage: null,
  });

  const token = localStorage.getItem("loginToken");

  const handleAllFlashTopic = async () => {
    const response = await ApiGetDetails("all-flash-topics", token);
    setNewFlashTopics(response?.data);
  };

  // for updated data get ke ley kara
  useEffect(() => {
    handleAllFlashTopic();
  }, []);

  useEffect(() => {
    const handleAllFlashLevel = async () => {
      const response = await ApiGetDetails("all-flash-category-level", token);

      console.log(response.data, "all flash level");

      setNewFlashLevel(response.data);
    };
    handleAllFlashLevel();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        flashImage: file,
      }));
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handlePublish = async (event) => {
    event.preventDefault();
    setLoading(true);

    const uploadFormData = new FormData();
    uploadFormData.append("title", formData.title);
    uploadFormData.append("description", formData.description);
    uploadFormData.append("hint", formData.hint);
    uploadFormData.append("subject", formData.subject);
    uploadFormData.append("masteryLevel", formData.masteryLevel);
    uploadFormData.append("confidance_level", formData.confidance_level);
    uploadFormData.append("flash_topics", formData.flash_topics);
    uploadFormData.append("frontTitle", formData.frontTitle);
    uploadFormData.append("backTitle", formData.backTitle);

    if (formData.frontImage) {
      uploadFormData.append("frontImage", formData.frontImage);
    }

    if (formData.backImage) {
      uploadFormData.append("backImage", formData.backImage);
    }

    if (formData.flashImage) {
      uploadFormData.append("flashImage", formData.flashImage);
    }

    try {
      const response = await ApiCreateFormData(
        "create-flash-card",
        uploadFormData,
        token
      );
      if (response.status === 200) {
        toast.success("card created successfully");

        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }

        setFormData({
          title: "",
          description: "",
          hint: "",
          subject: "",
          masteryLevel: "",
          confidance_level: "",
          flash_topics: "",
          flashImage: null,
          frontTitle: "",
          backTitle: "",
          frontImage: null,
          backImage: null,
          frontImagePreview: null,
          backImagePreview: null,
        });

        // Clear image preview
        setImagePreview(null);
        setFrontImagePreview(null);
        setBackImagePreview(null);
      }
    } catch (error) {
      console.error("Error creating card:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // for use firstword capital
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleCreateTopic = async (e) => {
    e.preventDefault();

    const formattedTopic = capitalizeWords(topicFlashName.trim());

    const response = await ApiPostWithToken("create-flash-topics", token, {
      topicFlashName: formattedTopic,
    });

    if (response.status === 200) {
      toast.success("Added new Topic");
      setShowModal(false);
      setNewtopicFlashName("");
      handleAllFlashTopic();
    }
  };

  return (
    <div>
      <div className="flex items-center gap-1 mt-3 pl-6 cursor-pointer justify-between">
        <Link to={"/teacherDashboard/flashcard"}>
          <div className="flex items-center gap-2">
            <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
            <h1 className="font-bold text-2xl text-[#191925]">FlashCard</h1>
          </div>
        </Link>
        <div className="w-[35%] flex gap-2">
          <button className="w-[30%]"> </button>

          <button
            onClick={handlePublish}
            type="submit"
            disabled={loading}
            className={`w-[32%] p-2.5 rounded-xl bg-[#7240FD] text-white cursor-pointer ${
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

      <div className="w-[90%] m-auto mt-10 p-6  rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-[#191925]">
          Create New FleshCard
        </h1>

        <div className="w-full m-auto mt-6">
          <h1 className="text-[#191925] font-lg font-semibold mt-3">Title</h1>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChnage}
            placeholder="Write question here"
            className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg "
          />
        </div>

        <div className="w-full m-auto mt-6">
          <h1 className="text-[#191925] font-lg font-semibold mt-3">
            Description
          </h1>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChnage}
            placeholder="write description here"
            className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg "
          />
        </div>

        <div className="flex gap-2">
          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">Hint</h1>
            <input
              type="text"
              name="hint"
              value={formData.hint}
              onChange={handleChnage}
              placeholder="Write hint here"
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg"
            />
          </div>

          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              Subject
            </h1>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChnage}
              placeholder="Write subject here"
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="w-full m-auto mt-6">
          <h1 className="text-[#191925] font-lg font-semibold mt-3">
            Mastery Level
          </h1>
          <input
            type="text"
            name="masteryLevel"
            value={formData.masteryLevel}
            onChange={handleChnage}
            placeholder="0"
            className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 ">
          {/* Confidence Level */}
          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              Confidence Level
            </h1>
            <select
              name="confidance_level"
              onChange={handleChnage}
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg"
              value={formData.confidance_level}
            >
              <option value="" disabled>
                Choose Level
              </option>
              {getFlashLevel?.categoryLevel?.map((flashLevel, index) => (
                <option key={flashLevel._id} value={flashLevel._id}>
                  {flashLevel.confidance_level}
                </option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">Topic</h1>

            <select
              name="flash_topics"
              value={formData.flash_topics}
              onChange={handleChnage}
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg"
            >
              <option value="" disabled>
                Choose Topic
              </option>
              {getFlashTopics?.flashcardTopics?.map((flash, index) => (
                <option key={flash._id} value={flash._id}>
                  {flash?.topicFlashName}
                </option>
              ))}
            </select>
          </div>

          {/* Add New Topic Button */}
          <div className="w-[40%] m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              Add new Topic
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              + Add Topic
            </button>
          </div>
        </div>

        <h2 className="pt-12 font-semibold text-lg text-[#191925]">Image</h2>

        <div className="border-2 w-full h-[250px] border-gray-300 border-dashed mr-40 flex justify-center items-center mt-3">
          {!imagePreview ? (
            <label>
              <input
                type="file"
                accept="image/*"
                value={formData.flashImage ? formData.flashImage : null}
                onChange={handleImageChange}
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
                src={imagePreview}
                alt="Selected Cover"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 mt-6 border-2 p-3 border-gray-300 rounded-xl">
          {/* Front Section */}
          <div className="flex items-start gap-4">
            <div className="w-[10%] relative">
              <label
                htmlFor="frontImage"
                className="border-2 aspect-square border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {frontImagePreview ? (
                  <img
                    src={frontImagePreview}
                    alt="Front Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">
                    <h1>Front</h1>
                    <img className="mt-2" src={front} alt="" />
                  </span>
                )}

                <input
                  type="file"
                  id="frontImage"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFormData((prev) => ({ ...prev, frontImage: file }));
                      setFrontImagePreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>

              {frontImagePreview && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, frontImage: null }));
                    setFrontImagePreview(null);
                  }}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-700 z-10"
                >
                  <ImCross />
                </button>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-[#191925] text-sm font-semibold mb-2">
                Front Title
              </h1>
              <input
                type="text"
                name="frontTitle"
                value={formData.frontTitle}
                onChange={handleChnage}
                placeholder="Front Content"
                className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300"
              />
            </div>
          </div>

          {/* Back Section */}
          <div className="flex items-start gap-4">
            <div className="w-[10%]">
              <label
                htmlFor="backImage"
                className="relative border-2 aspect-square border-dashed border-gray-300 rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {backImagePreview ? (
                  <img
                    src={backImagePreview}
                    alt="Back Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">
                    <h1>Back</h1>
                    <img className="mt-2" src={front} alt="" />

                  </span>
                )}
                <input
                  type="file"
                  id="backImage"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setFormData((prev) => ({ ...prev, backImage: file }));
                      setBackImagePreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
            </div>

            <div className="flex-1">
              <h1 className="text-[#191925] text-sm font-semibold mb-2">
                Back Title
              </h1>
              <input
                type="text"
                name="backTitle"
                value={formData.backTitle}
                onChange={handleChnage}
                placeholder="Back Content"
                className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <form onSubmit={handleCreateTopic}>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-[500px]">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Create New Topic
              </h2>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Topic Name
              </label>
              <input
                type="text"
                name="topicFlashName"
                id="topicFlashName"
                value={topicFlashName}
                onChange={handleChnage}
                placeholder="Enter topic"
                className="w-full px-3 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-black hover:text-white border-2 border-gray-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Create Topic
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default TeacherCreateFlashCard;
