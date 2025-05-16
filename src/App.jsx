import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import StudentDashboard from "./components/DashBoard/StudentDashboard";
import StudentDashBoardProfile from "./components/DashBoard/StudentDashBoardProfile";
import StudentSettings from "./components/DashBoard/StudentSettings";
import VerifyOtp from "./components/Auth/VerifyOtp";
import ChangePassword from "./components/Auth/ChangePassword";
import StudentBlog from "./components/DashBoard/StudentBlog";
import VerifyEmail from "./components/Auth/VerifyEmail";
// import ForgetPassword from "./components/Auth/ForgetPassword";
import StudentDiscover from "./components/DashBoard/StudentDiscover";
import { ToastContainer } from "react-toastify";
import TeacherDashboard from "./components/TeacherDasboard/TeacherDashboard";
import TeacherBlog from "./components/TeacherDasboard/TeacherBlog";
import TeacherFleshCard from "./components/TeacherDasboard/TeacherFleshCard";
import TeacherQuiz from "./components/TeacherDasboard/TeacherQuiz";
import { useRef } from "react";
import StudentQuiz from "./components/DashBoard/StudentQuiz";
import StudentFlashCard from "./components/DashBoard/StudentFlashCard";
import TeacherCourse from "./components/TeacherDasboard/TeacherCourse";
import TeacherCreateBlog from "./components/TeacherDasboard/TeacherCreateBlog";
import TeacherCreateFlashCard from "./components/TeacherDasboard/TeacherCreateFlashCard";
import TeacherCreateQuiz from "./components/TeacherDasboard/TeacherCreateQuiz";
import TeacherCreateCourse from "./components/TeacherDasboard/TeacherCreateCourse";
import StudentCourse from "./components/DashBoard/StudentCourse";
import TeacherLesson from "./components/TeacherDasboard/TeacherLesson";
import TeacherCreateLesson from "./components/TeacherDasboard/TeacherCreateLesson";
import BlogDetailed from "./components/Detailed/BlogDetailed";
import BlogSingle from "./components/Detailed/BlogSingle";
import FleshCardDetailed from "./components/Detailed/FleshCardDetailed";
function App() {
  // for the slide to click about and other......
  const aboutSectionRef = useRef(null);
  const featuresSectionRef = useRef(null);
  const faqSectionRef = useRef(null);
  const coursesSectionRef = useRef(null);

  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFeatures = () => {
    featuresSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFaq = () => {
    faqSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCourses = () => {
    coursesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <NavBar
                scrollToAbout={scrollToAbout}
                scrollToFeatures={scrollToFeatures}
                scrollToFaq={scrollToFaq}
                scrollToCourses={scrollToCourses}
              />
            }
          >
            <Route
              index
              element={
                <Home
                  aboutRef={aboutSectionRef}
                  featuresRef={featuresSectionRef}
                  faqRef={faqSectionRef}
                  coursesRef={coursesSectionRef}
                />
              }
            />

            {/* for student dashboard */}
            <Route path="/studentDashboard" element={<StudentDashboard />}>
              <Route index element={<StudentDashBoardProfile />} />
              <Route
                path="/studentDashboard/settings"
                element={<StudentSettings />}
              />
              <Route path="/studentDashboard/blogs" element={<StudentBlog />} />

              <Route
                path="/studentDashboard/course"
                element={<StudentCourse />}
              />
              <Route
                path="/studentDashboard/discover"
                element={<StudentDiscover />}
              />
              <Route path="/studentDashboard/quiz" element={<StudentQuiz />} />
              <Route
                path="/studentDashboard/flashcard"
                element={<StudentFlashCard />}
              />
            </Route>
            {/* for blog single page */}
            <Route path="/blog/:category" element={<BlogDetailed />} />
            <Route path="/singleblog/:_id" element={<BlogSingle />} />

            {/* for flash card single */}

            <Route path="/flashcard/:subject" element={<FleshCardDetailed />} />

            {/* for teacher dashboard */}

            <Route path="/teacherDashboard" element={<TeacherDashboard />}>
              <Route index element={<TeacherBlog />} />
              <Route
                path="/teacherDashboard/createBlog"
                element={<TeacherCreateBlog />}
              />

              <Route
                path="/teacherDashboard/flashcard"
                element={<TeacherFleshCard />}
              />
              <Route
                path="/teacherDashboard/createFlashcard"
                element={<TeacherCreateFlashCard />}
              />

              <Route path="/teacherDashboard/quiz" element={<TeacherQuiz />} />
              <Route
                path="/teacherDashboard/createQuiz"
                element={<TeacherCreateQuiz />}
              />

              <Route
                path="/teacherDashboard/course"
                element={<TeacherCourse />}
              />
              <Route
                path="/teacherDashboard/createCourse"
                element={<TeacherCreateCourse />}
              />

              <Route
                path="/teacherDashboard/lesson"
                element={<TeacherLesson />}
              />

              <Route
                path="/teacherDashboard/createLesson"
                element={<TeacherCreateLesson />}
              />
            </Route>
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          {/* <Route path="/forget-password" element={<ForgetPassword />} /> */}
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
