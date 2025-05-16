import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avater from "../../assets/avatar.png";
import upload from "../../assets/upload.png";
import calender from "../../assets/calndr.png";
import {
  ApiDeleteDetails,
  ApiGetDetails,
  ApiUpdateFormData,
} from "../../Axios/ApiRequirest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const StudentSettings = () => {
  const token = localStorage.getItem("loginToken");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    birthDay: "",
    profileImage: null,
    address: {
      city: "",
      state: "",
      country: "",
    },
    interest: {
      level: "",
      area_of_interest: [],
      goal: "",
      preferences: "",
    },
  });

  const [foundAuthDetails, setFoundAuthDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);

  console.log(imagePreview, "image state");

  const profileImageInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["city", "state", "country"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else if (["goal", "preferences", "area_of_interest"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        interest: {
          ...prev.interest,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const uploadFormData = new FormData();
    uploadFormData.append("fullName", formData.fullName);
    uploadFormData.append("mobileNumber", formData.mobileNumber);
    uploadFormData.append("birthDay", formData.birthDay);
    uploadFormData.append("address[city]", formData?.address?.city);
    uploadFormData.append("address[state]", formData?.address?.state);
    uploadFormData.append("address[country]", formData?.address?.country);

    uploadFormData.append("interest[goal]", formData?.interest?.goal);
    uploadFormData.append("interest[preferences]", formData?.interest?.preferences);
    uploadFormData.append("interest[area_of_interest]", formData?.interest?.area_of_interest);



    if (formData.profileImage) {
      uploadFormData.append("profileImage", formData.profileImage);
    }

    try {
      const response = await ApiUpdateFormData(
        "user/update-user-details",
        uploadFormData,
        token
      );
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleFoundSettingDetails = async () => {
      try {
        const response = await ApiGetDetails("user/found-auth-details", token);
        const details = response.data.authDetails;

        setFoundAuthDetails(details);
        setFormData({
          fullName: details.fullName || "",
          mobileNumber: details.mobileNumber || "",
          birthDay: details.birthDay || "",
          profileImage: null,
          address: {
            city: details?.address?.city || "",
            state: details?.address?.state || "",
            country: details?.address?.country || "",
          },
          interest: {
            goal: details?.interest?.goal || "",
            preferences: details?.interest?.preferences || "",
            area_of_interest: details?.interest?.area_of_interest || "",
          },
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error("Failed to fetch user details.");
      }
    };
    handleFoundSettingDetails();
  }, [token]);

  const handleDeleteAuth = async (e) => {
    e.preventDefault();

    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const response = await ApiDeleteDetails("delete-auth-profile", token);
        console.log(response);

        if (response.data.status === 200) {
          localStorage.removeItem("loginToken");
          localStorage.removeItem("role");
          toast.success("Account deleted successfully.");
          navigate("/");
        } else {
          toast.error("Failed to delete account.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        toast.error("An error occurred while deleting your account.");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 ">
      <div className="container mx-auto w-[85%] bg-white rounded-lg shadow-md p-8 ">
        <Link
          to="/studentDashboard"
          className="mb-6 inline-block text-blue-500 hover:underline"
        >
          <div className="flex items-center gap-2 cursor-pointer">
            <FontAwesomeIcon icon={faArrowLeft} className="text-gray-700" />
            <h1 className="font-semibold text-xl text-gray-800">
              Edit Profile
            </h1>
          </div>
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Info
            </h2>
            <hr className="border-t border-gray-300 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Profile Picture
                </label>
                <p className="text-gray-600 text-sm mb-2">
                  This will be shown on your profile.
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-300">
                    {formData.profileImage ? (
                      <img
                        className="object-cover w-full h-full"
                        src={imagePreview}
                        alt="Profile Preview"
                      />
                    ) : (
                      <img
                        className="object-cover w-full h-full"
                        src={
                          foundAuthDetails?.profileImage
                            ? foundAuthDetails.profileImage
                            : avater
                        }
                        alt="Avatar"
                      />
                    )}
                    <input
                      type="file"
                      id="profileImage"
                      name="profileImage"
                      accept="image/*"
                      ref={profileImageInputRef}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      onChange={handleImageChange}
                    />
                  </div>
                  <label
                    className="text-blue-500 text-sm cursor-pointer hover:underline flex items-center gap-1 relative right-6 top-9"
                    onClick={() => profileImageInputRef.current?.click()}
                  >
                    <span className="bg-white-500 text-xl text-purple-600">
                      <FontAwesomeIcon icon={faUpload} />
                    </span>
                    {formData.profileImage ? "Change" : "Upload"}
                  </label>
                </div>
              </div>

              <div className="border-dashed border-gray-300 rounded-lg relative overflow-hidden h-32 md:h-48 flex justify-center items-center"></div>

              <div className="col-span-2">
                <label
                  htmlFor="role"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Role
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={foundAuthDetails.role || ""}
                  className="shadow appearance-none border border-gray-300 rounded w-[49%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 cursor-not-allowed"
                  readOnly
                />
              </div>

              <div>
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={foundAuthDetails.email || ""}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 cursor-not-allowed"
                  readOnly
                />
              </div>

              <div>
                <label
                  htmlFor="mobileNumber"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Number
                </label>
                <input
                  type="number"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter your mobileNumber"
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div>
                <label
                  htmlFor="birthDay"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Birthday
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img
                      src={calender}
                      alt="Calendar Icon"
                      className="w-5 h-5 text-gray-500"
                    />
                  </div>
                  <input
                    type="date"
                    id="birthDay"
                    name="birthDay"
                    value={formData.birthDay}
                    onChange={handleChange}
                    className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  placeholder="Enter your City"
                  id="city"
                  name="city"
                  value={formData?.address?.city}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                />
              </div>

              <div>
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  State
                </label>
                <input
                  type="text"
                  placeholder="Enter your State"
                  id="state"
                  name="state"
                  value={formData?.address?.state}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                />
              </div>

              <div>
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Enter your Country"
                  id="country"
                  name="country"
                  value={formData?.address?.country}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                />
              </div>

              <div>
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Skill Level
                </label>
                <input
                  type="text"
                  id="level"
                  name="level"
                  value={foundAuthDetails?.interest?.level || ""}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 cursor-not-allowed"
                  readOnly
                />
              </div>

              <div>
                <label
                  htmlFor="text"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Goal
                </label>
                <input
                  type="text"
                  id="goal"
                  name="goal"
                  value={formData.interest.goal}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                />
              </div>

              <div>
                <label
                  htmlFor="preferences"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Preferences
                </label>
                <select
                  id="preferences"
                  name="preferences"
                  value={formData.interest.preferences}
                  onChange={handleChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a preference</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="only for important updates">
                    Only for important updates
                  </option>
                </select>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="areaInterest"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Areas of Interest (comma separated)
                </label>
                <input
                  type="text"
                  id="area_of_interest"
                  name="area_of_interest"
                  value={formData.interest.area_of_interest}
                  onChange={handleChange}
                  placeholder="e.g Math, Science, History"
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Email Notifications
            </h2>
            <hr className="border-t border-gray-300 mb-4" />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Marketing Emails
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Notifications about product updates, company notes, etc.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-500 transition-all duration-300"></div>
                  <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-5"></span>
                </label>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Reminders / General
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Reminders to encourage you to keep studying.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-500 transition-all duration-300"></div>
                  <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-5"></span>
                </label>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Account
            </h2>
            <hr className="border-t border-gray-300 mb-4" />
            <div className="space-y-4">
              <div className="">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Reset Password
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Need to update your password? Click the button on the right
                    to reset it easily.
                  </p>
                </div>
                <Link to={"/change-password"} className="inline-block mt-4">
                  <div className="border border-purple-700 rounded-md shadow-sm px-4 py-2 bg-white hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex gap-2 items-center">
                      <p className="text-sm font-semibold text-purple-700">
                        Reset Password
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="">
                <div>
                  <h3 className="text-lg font-semibold">Delete Account</h3>
                  <p className="text-gray-600 text-sm">
                    We will archive your account for 30 days before permanently
                    deleting it and all associated information.
                  </p>
                </div>
                <button
                  onClick={handleDeleteAuth}
                  className="border rounded-md mt-3 shadow-sm px-4 py-2 transition-colors duration-200 border-red-300 text-white bg-red-600 font-semibold text-sm"
                >
                  <div className="flex gap-2 items-center cursor-pointer ">Delete Account</div>
                </button>
              </div>
            </div>
          </section>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-black cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <CircularProgress size={20} color="inherit" />
                  <span>Saving...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentSettings;
