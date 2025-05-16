import React, { useEffect, useState } from "react";
import { ApiGetDetails, ApiGetDetailsParams } from "../../Axios/ApiRequirest";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

const BlogDetailed = () => {
  const token = localStorage.getItem("loginToken");
  const { category } = useParams();

  const navigate = useNavigate()

  const [detaildBlog, setDetailedBlog] = useState([]);
  const [foundBlog, setFoundAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get all blogs
  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        setLoading(true);
        const response = await ApiGetDetails("found-all-blogs", token);
        setFoundAllBlogs(response.data.publicBlog);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBlogs();
  }, []);

  // Get category blogs
  useEffect(() => {
    const fetchCategoryBlogs = async () => {
      try {
        setLoading(true);
        const response = await ApiGetDetailsParams(
          "found-blog-category",
          token,
          category
        );
        setDetailedBlog(response.data.feature_blog_detaild);
      } catch (error) {
        console.error("Error fetching category blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryBlogs();
  }, [category]);


  const handleSingleBlog = (_id) => {
    navigate(`/singleblog/${_id}`);
  }

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

  if (!loading && detaildBlog.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">No Blog Posts Found</h1>
        <p className="text-gray-500">Please try again later or check the Blog Section.</p>
        <Link to="/studentDashboard/blogs" className="mt-4 text-blue-500 flex items-center gap-2">
          <FiChevronLeft />
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="w-full h-[300px] bg-gradient-to-b from-[#5C25F5] to-[#7240FD] flex items-center justify-center">
        <div className="text-center px-4 p-6">
          <h1 className="text-3xl font-bold text-white mb-4">{detaildBlog[0]?.category}</h1>
          <p className="text-[#E2E8F0] text-sm leading-6">{detaildBlog[0]?.shortDescription}</p>
        </div>
      </div>

      {/* Latest Blog */}
      <div className="w-[85%] mx-auto py-8">
        <h1 className="font-bold text-3xl mb-6 flex items-center gap-2">
          <Link to={"/studentDashboard/blogs"}>
            <FiChevronLeft className="text-gray-700 cursor-pointer" />
          </Link>
          Latest Blog
        </h1>

        {/* Main Blog */}
        <div className="relative w-full h-96 mb-10 rounded-lg overflow-hidden">
          <img src={detaildBlog[0]?.coverBlogImage} alt={detaildBlog[0]?.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent text-black p-6">
            <p className="text-lg font-bold mb-1">{detaildBlog[0]?.category}</p>
            <p className="text-lg font-bold mb-1">{detaildBlog[0]?.shortDescription}</p>
            <span className="flex items-center gap-3 mt-2">
              <h3 className="text-[15px] font-bold">{detaildBlog[0]?.blogCreatedBy?.fullName}</h3>
              <p className="text-[15px] font-medium">
                {new Date(detaildBlog[0]?.createdAt).toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </span>
          </div>
        </div>

        {/* Other Blogs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {detaildBlog.slice(1, 3).map((blog, index) => (
            <div key={index} className="relative h-64 rounded-lg overflow-hidden">
              <img src={blog.coverBlogImage} alt={blog.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent text-white p-4">
                <p className="mb-1 font-bold text-lg">{blog.category}</p>
                <h3 className="text-xl mb-2 font-semibold">{blog.title}</h3>
                <h3 className="text-sm">{blog.shortDescription}</h3>
                <span className="flex items-center gap-3 mt-2">
                  <h3 className="text-[15px] font-bold">{blog.blogCreatedBy.fullName}</h3>
                  <p className="text-[15px] font-medium">
                    {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Reads Section */}
      <div className="w-[85%] mx-auto py-8">
        <h1 className="font-bold text-3xl">Top Reads</h1>

        {foundBlog.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-screen">
            <h1 className="mt-4 text-2xl font-semibold text-[#191925]">Your Blog is Empty</h1>
            <p className="text-sm text-gray-400 mt-2 text-center">
              You haven't posted any articles yet. Start creating content to engage and inform your audience.
            </p>
          </div>
        ) : (
          <div className="w-[90%] m-auto h-full shadow-lg rounded-lg mt-12 ">
            {foundBlog.map((blog, index) => (
              <div key={index}
              onClick={()=> handleSingleBlog(blog._id)}
              className="border-b-2 border-dotted w-[95%] m-auto p-10 text-start cursor-pointer hover:bg-gray-50 transition">
                <div className="w-[70%] m-auto flex items-start justify-between">
                  <div>
                    <div className="flex gap-4 items-center">
                      <div>
                        <h1 className="text-start text-[#4297FB] font-semibold">{blog.title}</h1>
                        <h1 className="text-start font-bold">{blog.category}</h1>
                      </div>
                    </div>
                    <p className="mt-2 font-semibold text-md text-[#191925]">{blog.shortDescription}</p>
                    <div className="flex gap-2 items-center">
                      <div className="flex items-center mt-2 pl-8 space-x-2">
                        <img src={blog?.blogCreatedBy?.profileImage} alt={blog?.blogCreatedBy?.fullName || "User Avatar"} className="w-8 h-8 rounded-full object-cover" />
                        <p className="text-[15px] text-[#495D79] font-medium">{blog?.blogCreatedBy?.fullName}</p>
                      </div>
                      <p className="font-bold text-xl">.</p>
                      <p className="text-[15px] text-[#495D79] font-medium mt-2">
                        {new Date(blog.createdAt).toLocaleDateString("en-IN", {
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetailed;
