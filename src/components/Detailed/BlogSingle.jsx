import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ApiGetDetailsParams } from "../../Axios/ApiRequirest";
import { FiChevronLeft } from "react-icons/fi";

const BlogSingle = () => {
  const { _id } = useParams();
  const token = localStorage.getItem("loginToken");

  const [loading, setLoading] = useState(true);
  const [singleBlog, setSingleBlog] = useState(null);

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        setLoading(true);
        const response = await ApiGetDetailsParams(
          "found-blog-single",
          token,
          _id
        );
        setSingleBlog(response.data.feature_single_blog);
      } catch (error) {
        console.error("Error fetching single blog:", error);
        setSingleBlog(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleBlog();
  }, [_id, token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="loader border-4 border-blue-300 border-t-transparent rounded-full w-12 h-12 animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!singleBlog) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">
          Blog Not Found
        </h1>
        <p className="text-gray-500">
          Please check the blog ID or try again later.
        </p>
        <Link
          to="/studentDashboard/blogs"
          className="mt-4 text-blue-500 underline flex items-center gap-2"
        >
          <FiChevronLeft />
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="relative w-full h-[300px] bg-gradient-to-b from-[#5C25F5] to-[#7240FD] flex flex-col items-center justify-center">
        <Link
          to={`/blog/${singleBlog?.category}`}
          className="absolute top-6 left-6 text-white text-3xl cursor-pointer hover:text-gray-200"
        >
          <FiChevronLeft />
        </Link>

        <div className="text-center px-4 p-6">
          <h1 className="text-3xl font-bold text-white mb-4">
            {singleBlog?.category}
          </h1>
          <p className="text-[#E2E8F0] text-sm leading-6">
            {singleBlog?.shortDescription}
          </p>

          {/* Author Info inside the header */}
          <div className="flex items-center gap-3 mt-6 justify-center">
            <img
              src={singleBlog?.blogCreatedBy?.profileImage}
              alt={singleBlog?.blogCreatedBy?.fullName || "Author"}
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
            <div className="text-left">
              <h3 className="font-bold text-white">
                {singleBlog?.blogCreatedBy?.fullName}
              </h3>
              <p className="text-sm text-gray-200">
                {new Date(singleBlog?.createdAt).toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Details Section */}
      <div className="w-[85%] mx-auto my-8 space-y-6">
        <div className="relative w-full h-96 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={singleBlog?.coverBlogImage}
            alt={singleBlog?.title || "Blog Cover"}
          />
        </div>

        <h1 className="text-center font-bold text-3xl">Content Detailed:</h1>
        <div className="text-lg mt-4 text-[#535353] leading-7 whitespace-pre-line">
          {singleBlog?.contentDetails}
        </div>

        {/* Author Info */}
      </div>
    </div>
  );
};

export default BlogSingle;
