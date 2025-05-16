import React from "react";
import musicls from "../../assets/musicls.png";
import heart from "../../assets/signup1.png";
import ribben from "../../assets/ribben.png";
import LottiePlayer from "../animations/LottiePlayer";
import Happy from "../../components/animations/data/Happy.json";
import { Search } from 'lucide-react';
const LearningDetails = [
  {
    image: musicls,
    title: "Anathomy Upper Quadrant",
    description:
      "A comprehensive course on the anotomy of the upper quadrant, focusing on detailed structures and functions.",
    completed: "40%",
  },

  {
    image: heart,
    title: "Anathomy Upper Quadrant",
    description:
      "A comprehensive course on the anotomy of the upper quadrant, focusing on detailed structures and functions.",
    completed: "60%",
  },
];

const SavedQuiz = [
  {
    Quizimage: musicls,
    Quiztitle: "Exercise Therapy",
    Quizdescription:
      "his Quiz will test your knowledge of different types of exercise therapy, its benifits, and all its application methods.",
    Quizcompleted: "140 Questions",
  },

  {
    Quizimage: heart,
    Quiztitle: "Exercise Therapy",
    Quizdescription:
      "his Quiz will test your knowledge of different types of exercise therapy, its benifits, and all its application methods.",
    Quizcompleted: "160 Questions",
  },
];

const StudentDiscover = () => {
  return (
    <div>
      <div className=" w-full bg-[#f8f4ff]">
        <div className=" w-[65%] m-auto pt-12">
          <div className="w-full max-w-md mx-auto mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search here..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5 cursor-pointer" />
            </div>
          </div>

          <div>
            <h1 className="font-bold text-2xl mt-4 pl-6">Continue Learning</h1>
          </div>

          <div className=" w-[98%] mt-6 flex gap-6 pl-6 ">
            {LearningDetails.map((learn, index) => (
              <div className="border-2 shadow-2xl w-[48%] pb-4 rounded-xl border-gray-300">
                <img className="p-1.5 rounded-xl" src={learn.image} alt="" />
                <span className="flex gap-2 items-center text-gray-400 pl-2">
                  <p>Quiz .</p>
                  <p>20 questions left</p>
                </span>
                <h2 className="font-semibold text-xl mt-2 pl-2">
                  {learn.title}
                </h2>
                <p className="text-[15px] text-[#687494] mt-2 pl-2">
                  {learn.description}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <div className="w-[60%] rounded-2xl p-1 border-2 border-gray-400 mt-2 bg-green-400 ml-2"></div>
                  <h2 className="font-semibold text-[15px]">
                    {learn.completed}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          <div className="pl-3 rounded-2xl w-full h-[200px] m-auto mt-5 bg-gradient-to-r from-[#7240FD] to-[#9C7DF3] flex items-center mt-10">
            <div className=" w-[70%]">
              <h1 className="mt-3 text-2xl font-semibold text-[#FFFFFF] ml-3">
                Suggested Quiz
              </h1>
              <p className="text-[#F6F9FC] mt-2 text-[16px] ml-3">
                We offer a Personalized selection of quizzes based on ypur
                previous activities and performances. Dive in and challenge
                yourself with new and exciting topics.
              </p>
            </div>

            <div>
              {/* <img src={ribben} alt="" className='w-[60%] h-full'/> */}
              <LottiePlayer animationFile={Happy} />
            </div>
          </div>

          <div className="w-[95%] m-auto mt-12">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-2xl pl-5 mt-6">Saved Quiz</h1>
              <p className="text-[#7240FD] font-bold text-sm mt-6 pr-3 cursor-pointer">
                See All
              </p>
            </div>

            {SavedQuiz.map((quiz, index) => (
              <div className="border-2 border-gray-300 w-full flex items-center mt-4 rounded-2xl">
                <div className="w-[25%] h-[200px]">
                  <img
                    src={quiz.Quizimage}
                    className="p-2 w-full h-full object-cover rounded-2xl"
                    alt=""
                  />
                </div>

                <div className="w-[70%]">
                  <h1 className="font-semibold text-xl ml-2">
                    {quiz.Quiztitle}
                  </h1>
                  <p className="text-sm text-gray-500 ml-2 mt-2">
                    {quiz.Quizdescription}
                  </p>
                  <span className="flex gap-2 items-center text-gray-400 pl-2 mt-3">
                    <p>{quiz.Quizcompleted} .</p>
                    <p>20 Min</p>
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h1 className="font-bold text-2xl mt-12 pl-6 ">Flash Card</h1>
          </div>

          <div className=" w-[95%] m-auto mt-6 flex gap-6 pb-12 ">
            {LearningDetails.map((learn, index) => (
              <div className="border-2 w-[48%] pb-4 rounded-xl border-gray-300 shadow-xl">
                <img className="p-1.5 rounded-xl" src={learn.image} alt="" />
                <h2 className="font-semibold text-xl mt-2 pl-2">
                  {learn.title}
                </h2>
                <p className="text-[15px] text-[#687494] mt-2 pl-2">
                  {learn.description}
                </p>

                <span className="flex gap-2 items-center text-gray-400 pl-2 mt-3">
                  <p>Quiz .</p>
                  <p>20 questions left</p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDiscover;
