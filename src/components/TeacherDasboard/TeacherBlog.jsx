import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import blog from "../../assets/blog1.png";
import blog2 from "../../assets/blog2.png";
import upload from "../../assets/upload.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  ApiDeleteParamsDetails,
  ApiGetDetails,
} from "../../Axios/ApiRequirest";
import { toast } from "react-toastify";

function TeacherBlog() {
  const navigate = useNavigate();
  const token = localStorage.getItem("loginToken");

  const [foundBlog, setFoundAllBlogs] = useState([]);
  const [publicBlog, setFoundPublicBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeStep, setactiveStep] = useState(0);
  const [updatedData, setUpdatedData] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const headings = ["Draft", "Public"];

  useEffect(() => {
    const foundAllBlogsDetails = async () => {
      try {
        setLoading(true);
        const response = await ApiGetDetails("found-all-blogs", token);
        setFoundAllBlogs(response.data.allBlogs);
        setFoundPublicBlog(response.data.publicBlog);
        setUpdatedData(true);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    foundAllBlogsDetails();
  }, [updatedData]);

  const handleDeleteBlog = async (e) => {
    e.preventDefault();

    if (selectedBlogId) {
      try {
        const response = await ApiDeleteParamsDetails(
          "delete-blog",
          token,
          selectedBlogId
        );
        if (response.status === 200) {
          setUpdatedData(false);
          // if (activeStep === 0) {
          //   setFoundAllBlogs((prev) =>
          //     prev.filter((blog) => blog._id !== selectedBlogId)
          //   );
          // } else {
          //   setFoundPublicBlog((prev) =>
          //     prev.filter((blog) => blog._id !== selectedBlogId)
          //   );
          // }
          toast.success("Blog deleted successfully");
          setShowModal(false);
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="loader border-4 border-blue-300 border-t-transparent rounded-full w-12 h-12 animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading blogs...</p>
        </div>
      </div>
    );
  }

  const featureBlog = activeStep === 0 ? foundBlog : publicBlog;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-1 mt-3 pl-6 cursor-pointer justify-between">
        <div>
          <h1 className="font-bold text-2xl text-[#191925]">Blog</h1>
        </div>

        <div className="w-[35%] flex gap-2">
          <button className="w-[30%] p-2.5 rounded-xl bg-[#E2E8F0] text-black cursor-pointer">
            Featured
          </button>

          <button
            className="w-[30%] p-2.5 rounded-xl bg-[#7240FD] text-white cursor-pointer"
            onClick={() => navigate("/teacherDashboard/createBlog")}
          >
            + Create new
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-[90%] m-auto h-full shadow-lg rounded-lg mt-12 pb-20">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center">
            <img src={blog2} alt="" />
            <h1 className="font-semibold text-xl text-start">Featured Blogs</h1>
          </div>
          <div className="flex gap-2 w-[30%]">
            {headings.map((heading, index) => (
              <button
                onClick={() => setactiveStep(index)}
                key={index}
                className={`border-2 w-[60%] p-2 rounded-md text-sm font-medium transition ${
                  activeStep === index
                    ? "border-blue-500 text-blue-600"
                    : "border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-500"
                }`}
              >
                {heading}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Content */}
        {featureBlog.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-96">
            <div className="w-25 h-25 rounded-full overflow-hidden bg-[#EEF2F6] flex items-center justify-center">
              <img src={blog} alt="Blog" />
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-[#191925]">
              Your Blog is Empty
            </h1>
            <p className="text-sm text-gray-400 mt-2 text-center">
              You haven't posted any articles yet. Start creating content <br />{" "}
              to engage and inform your audience.
            </p>
          </div>
        ) : (
          featureBlog.map((blogItem, index) => (
            <div
              key={blogItem._id}
              className="border-b-2 border-dotted w-[95%] p-10 m-auto"
            >
              <div className="w-[80%] m-auto flex items-start justify-between">
                <div>
                  <div className="flex gap-4 items-center">
                    {/* <img
                      className="size-20 rounded-full p-1 bg-slate-200"
                      src={blogItem.coverBlogImage}
                      alt="blogimg"
                    /> */}

                    <div>

                    <h1 className="text-start text-[#4297FB] font-semibold">
                      {blogItem.title}
                    </h1>
                    <h1 className="text-start font-bold">
                      {blogItem.category}
                    </h1>
                    </div>
                  </div>
                  <p className="mt-2 font-medium text-md text-[#191925]">
                    {blogItem.shortDescription}
                  </p>
                  <div className="flex gap-2">
                    <p className="text-[15px] text-[#495D79] font-medium mt-2 pl-8">
                      {blogItem?.blogCreatedBy?.fullName} .
                    </p>
                    <p className="text-[15px] text-[#495D79] font-medium mt-2">
                      {new Date(blogItem.createdAt).toLocaleDateString(
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

                <div className="flex flex-row items-center gap-4 mt-4 md:mt-0 ml-12">
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
                        setSelectedBlogId(blogItem._id);
                        setShowModal(true);
                      }}
                      className="text-[#495D79] cursor-pointer hover:scale-110 transition-transform text-2xl md:text-xl"
                    />
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <form onSubmit={handleDeleteBlog}>
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
  );
}

export default TeacherBlog;
