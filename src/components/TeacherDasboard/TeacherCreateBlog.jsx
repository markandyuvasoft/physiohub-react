import React, { useState } from "react";
import { Link } from "react-router-dom";
import upload from "../../assets/upload.png";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ApiCreateFormData } from "../../Axios/ApiRequirest";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";



const TeacherCreateBlog = () => {
  const token = localStorage.getItem("loginToken");

  const [thumbnail, setThumbnail] = useState(null);

  const [loadingDraft, setLoadingDraft] = useState(false);
  const [loadingPublish, setLoadingPublish] = useState(false);

  const [imagePreviews, setImagePreviews] = useState({
    cover: null,
    thumbnail: null,
  });

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    contentDetails: "",
    category: "",
    saveAsBlog: "",
    coverBlogImage: null,
    thumbnailBlogImage: null,
  });

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [`${type}BlogImage`]: file,
      }));

      setImagePreviews((prev) => ({
        ...prev,
        [type]: URL.createObjectURL(file),
      }));
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublish = async (saveAsBlog) => {
    if (saveAsBlog === "draft") setLoadingDraft(true);
    if (saveAsBlog === "public") setLoadingPublish(true);

    const uplodFromData = new FormData();

    uplodFromData.append("title", formData.title);
    uplodFromData.append("shortDescription", formData.shortDescription);
    uplodFromData.append("contentDetails", formData.contentDetails);
    uplodFromData.append("category", formData.category);
    uplodFromData.append("saveAsBlog", saveAsBlog);

    if (formData.coverBlogImage) {
      uplodFromData.append("coverBlogImage", formData.coverBlogImage);
    }

    if (formData.thumbnailBlogImage) {
      uplodFromData.append("thumbnailBlogImage", formData.thumbnailBlogImage);
    }

    try {
      const response = await ApiCreateFormData(
        "create-blog",
        uplodFromData,
        token
      );

      if (response.status === 200) {
        toast.success("blog created successfully");

        setFormData({
          title: "",
          shortDescription: "",
          contentDetails: "",
          category: "",
          coverBlogImage: null,
          thumbnailBlogImage: null,
        });

        setImagePreviews({
          cover: null,
          thumbnail: null,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (saveAsBlog === "draft") setLoadingDraft(false);
      if (saveAsBlog === "public") setLoadingPublish(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-1 mt-3 pl-6 cursor-pointer justify-between">
        <Link to={"/teacherDashboard"}>
          <div className="flex items-center gap-2">
            <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
            <h1 className="font-bold text-2xl text-[#191925]">Blog</h1>
          </div>
        </Link>

        <div className="w-[35%] flex gap-2">
          <button
            className={`w-[30%] p-2.5 rounded-xl border-2 border-purple-600 text-purple-600 font-semibold ${
              loadingDraft ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => handlePublish("draft")}
            disabled={loadingDraft}
          >
            {loadingDraft ? (
              <div className="flex items-center gap-2 justify-center">
                <CircularProgress size={20} color="inherit" />
                <span>Process...</span>
              </div>
            ) : (
              "Save as Draft"
            )}
          </button>

          <button
            className={`w-[30%] p-2.5 rounded-xl bg-[#7240FD] text-white font-semibold ${
              loadingPublish
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => handlePublish("public")}
            disabled={loadingPublish}
          >
            {loadingPublish ? (
              <div className="flex items-center gap-2 justify-center">
                <CircularProgress size={20} color="inherit" />
                <span>Process...</span>
              </div>
            ) : (
              "Publish"
            )}
          </button>
        </div>
      </div>

      {/* create blog per click per*/}
      <form action="">
        <div className="w-[90%] m-auto mt-10 p-6  rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-[#191925]">Create New Blog</h1>
          <h2 className="pt-12 font-semibold text-xl">Cover</h2>
          <div className="border-2 w-full h-[250px] border-gray-300 border-dashed mr-40 flex justify-center items-center mt-3">
            {!imagePreviews.cover ? (
              <label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "cover")}
                  value={formData.coverBlogImage}
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
                  src={imagePreviews.cover}
                  alt="Selected Cover"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Thumbnail Image */}
          <h2 className="pt-12 font-semibold text-xl">Thumbnail</h2>
          <div className="border-2 w-full h-[250px] border-gray-300 border-dashed mr-40 flex justify-center items-center mt-3">
            {!imagePreviews.thumbnail ? (
              <label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "thumbnail")}
                  value={formData.thumbnailBlogImage}
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
                  src={imagePreviews.thumbnail}
                  alt="Selected Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">Title</h1>
            <input
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
              value={formData.title}
              placeholder="Enter title here"
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg "
            />
          </div>

          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              Category
            </h1>
            <input
              type="text"
              name="category"
              id="category"
              onChange={handleChange}
              value={formData.category}
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
              id="shortDescription"
              name="shortDescription"
              onChange={handleChange}
              value={formData.shortDescription}
              placeholder="Enter short description here"
              className="border-2 w-full p-2 mt-2 border-gray-300 rounded-lg "
            />
          </div>

          <div className="w-full m-auto mt-6">
            <h1 className="text-[#191925] font-lg font-semibold mt-3">
              Content
            </h1>
            <textarea
              type="text"
              id="contentDetails"
              name="contentDetails"
              onChange={handleChange}
              value={formData.contentDetails}
              placeholder="Write your content here...."
              className="border-2 w-full p-5 mt-2 border-gray-300 rounded-lg "
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TeacherCreateBlog;
