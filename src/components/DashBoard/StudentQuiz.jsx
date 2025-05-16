import React from "react";
import { Search } from "lucide-react";
import physio from "../../assets/physio.png";

const StudentQuiz = () => {
  return (
    <div>
      <div className="w-[90%] m-auto">
        <h1 className="font-semibold text-3xl">All Quizzes</h1>
        <p className="my-2">Checkout our quizzes, and test your skills.</p>

        <div>
          <input
            type="text"
            placeholder="Search by quiz title or description"
            className="w-[35%] pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <Search className="absolute left-81 top-59 text-gray-400 h-5 w-5 cursor-pointer" />
        </div>

        <div className="w-full grid grid-cols-3 mt-10 ">
          <div className="border-2 w-[95%] border-gray-300 rounded-xl">
            <img className="animate-pulse p-2" src={physio} alt="" />
            <h2 className="font-bold ml-3 text-lg">
              Cell Biology Fundamentals
            </h2>
            <p className="ml-3 text-sm">Questions 3</p>

            <div className="w-[90%] m-auto mt-4 pb-5">
              <button className="border-1 w-full rounded-lg border-purple-600 text-purple-700 font-semibold p-1 ">
                Join Quiz
              </button>
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default StudentQuiz;
