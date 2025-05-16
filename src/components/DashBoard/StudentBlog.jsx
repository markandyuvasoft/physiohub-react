import React, { useEffect, useState } from "react";
import blog2 from "../../assets/blog2.png";
import { ApiGetDetails } from "../../Axios/ApiRequirest";
import { useNavigate } from "react-router-dom";

function StudentBlog() {
  const token = localStorage.getItem("loginToken");

  const navigate = useNavigate()

  const [foundBlog, setFoundAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundAllBlogsDetails = async () => {
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

    foundAllBlogsDetails();
  }, []);


  const handleBlogDetailed =  (category) => {
    navigate(`/blog/${category}`);
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
  return (
    <div>
      {foundBlog.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <div className="w-25 h-25 rounded-full overflow-hidden bg-[#EEF2F6] flex items-center justify-center">
            <img src={blog2} alt="Featured Blog" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-[#191925]">
            Your Blog is Empty
          </h1>
          <p className="text-sm text-gray-400 mt-2 text-center">
            You haven't posted any articles yet. Start creating content to
            engage and inform your audience.
          </p>
        </div>
      ) : (
        <div className="w-[90%] m-auto h-full shadow-lg rounded-lg mt-12">
          <div className="flex items-center gap-2 p-6">
            <img src={blog2} alt="Featured Blog" />
            <h1 className="font-semibold text-xl">Featured Blog's</h1>
          </div>

          <div>
            {foundBlog?.map((blog) => (
              <div 
              onClick={()=> handleBlogDetailed(blog.category)}
                className="border-b-2 border-dotted w-[95%] m-auto p-10 text-start cursor-pointer hover:bg-gray-50 transition">
                <div className="w-[70%] m-auto flex items-start justify-between">
                  <div>
                    <div className="flex gap-4 items-center">
                     
                      <div>
                        <h1 className="text-start text-[#4297FB] font-semibold">
                          {blog.title}
                        </h1>
                        <h1 className="text-start font-bold">
                          {blog.category}
                        </h1>
                      </div>
                    </div>
                    <p className="mt-2 font-semibold text-md text-[#191925]">
                      {blog.shortDescription}
                    </p>
                    <div className="flex gap-2 items-center">
                      <div className="flex items-center mt-2 pl-8 space-x-2">
                        <img
                          src={blog?.blogCreatedBy?.profileImage}
                          alt={blog?.blogCreatedBy?.fullName || "User Avatar"}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <p className="text-[15px] text-[#495D79] font-medium">
                          {blog?.blogCreatedBy?.fullName}
                        </p>
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
        </div>
      )}
    </div>
  );
}

export default StudentBlog;
