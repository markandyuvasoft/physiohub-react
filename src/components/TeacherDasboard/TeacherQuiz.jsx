import React from "react";
import { useNavigate } from "react-router-dom";
import flash from "../../assets/flash.png";
import upload from "../../assets/upload.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import signup1 from "../../assets/signup1.png";
import physio from "../../assets/physio.png";
import quiz1 from "../../assets/quiz1.png";
import flash3 from "../../assets/flash3.png";

const Quiz = [
  {
    quizImage: signup1,
    title: "Geriatric",
    description: "Biomechanics",
    cards: "23 Questions",
    Duration: "20 min",
  },
  {
    quizImage: physio,
    title: "Geriatric",
    description: "Medicine",
    cards: "25 Questions",
    Duration: "20 min",
  },
];

function TeacherQuiz() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-1 mt-3 pl-6 cursor-pointer justify-between">
        <div>
          <h1 className="font-bold text-2xl text-[#191925]">Quiz</h1>
        </div>
        <div className="pr-20 w-[30%] flex gap-2">
          <button className="w-[50%] p-2.5 rounded-xl bg-[#E2E8F0] text-black cursor-pointer">
            Featured
          </button>

          <button
            className="w-[50%] p-2.5 rounded-xl bg-[#7240FD] text-white cursor-pointer"
            onClick={() => navigate("/teacherDashboard/createQuiz")}
          >
            + Create new
          </button>
        </div>
      </div>

      {/* flesh data naa hone per */}
      {Quiz.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <div className="w-25 h-25 rounded-full overflow-hidden bg-[#EEF2F6]  flex items-center justify-center">
            <img src={flash} alt="flash" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-[#191925]">
            Your Quiz is Empty
          </h1>
          <p className="text-sm text-gray-400 mt-2 text-center">
            You haven't posted any Quiz yet. Start creating Quiz <br /> to
            engage and inform your audience.
          </p>
        </div>
      ) : (
        <div className="w-[90%] mx-auto h-full shadow-lg rounded-lg mt-12 pb-20 ">
          {/* Show on blog details */}
          <div>
            {Quiz.map((quiz, index) => (
              <div
                key={index}
                className="border-b-2 border-dotted w-full p-6 md:p-10 mx-auto"
              >
                <div className="w-full flex flex-col md:flex-row items-start justify-between gap-6">
                  <div className="md:w-1/4 w-full">
                    <img
                      className="w-full h-auto object-cover rounded-md"
                      src={quiz.quizImage}
                      alt={quiz.quizImage}
                    />
                  </div>

                  <div className="flex-1">
                    <h1 className="text-[14px] md:text-xl text-[#4297FB] font-semibold text-start">
                      {quiz.title}
                    </h1>
                    <p className="mt-2 font-medium text-[20px] text-[#191925] text-start">
                      {quiz.description}
                    </p>

                    <div className="flex items-center flex-wrap gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <img
                          className="w-5 h-5 object-contain"
                          src={quiz1}
                          alt="Cards Icon"
                        />
                        <p className="text-md text-[#495D79] font-medium">
                          {quiz.cards}
                        </p>
                      </div>

                      <span className="text-lg text-[#B4BBCD] font-medium">
                        ·
                      </span>

                      <div className="flex items-center gap-2">
                        <img
                          className="w-5 h-5 object-contain"
                          src={flash3}
                          alt="Duration Icon"
                        />
                        <p className="text-md text-[#495D79] font-medium">
                          {quiz.Duration}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-4 mt-4 md:mt-0">
                    <span className="border-2 p-2.5 rounded-xl border-gray-300 cursor-pointer">
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="text-[#495D79] cursor-pointer hover:scale-110 transition-transform text-2xl md:text-xl"
                      />
                    </span>

                    <span className="border-2 p-2.5 rounded-xl border-gray-300 cursor-pointer">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-[#495D79] cursor-pointer hover:scale-110 transition-transform text-2xl md:text-xl"
                      />
                    </span>
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

export default TeacherQuiz;
