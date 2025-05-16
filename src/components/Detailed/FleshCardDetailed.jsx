import React, { useEffect, useState } from "react";
import { ApiGetDetailsParams } from "../../Axios/ApiRequirest";
import { Link, useParams } from "react-router-dom";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";
import icon5 from "../../assets/icon5.png";
import icon6 from "../../assets/icon6.png";
import icon7 from "../../assets/icon7.png";
import { FiChevronLeft } from "react-icons/fi";

import LottiePlayer from "../animations/LottiePlayer";
import Happy from "../../components/animations/data/Happy.json";

const FlashcardDetails = () => {
  const { subject } = useParams();
  const token = localStorage.getItem("loginToken");
  const [detailedFlashCard, setDetailedFlashCard] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const handleViewFlashCard = async () => {
      try {
        const response = await ApiGetDetailsParams(
          "found-single-card",
          token,
          subject
        );
        console.log(response, "detailed flash card");
        setDetailedFlashCard(response.data.feature_single_card);
      } catch (error) {
        console.error("Failed to fetch flashcard details", error);
      }
    };
    handleViewFlashCard();
  }, [subject, token]);

  const progress = completed
    ? 100
    : detailedFlashCard?.length > 0
    ? ((currentIndex + 1) / detailedFlashCard?.length) * 100
    : 0;

  const handleNext = () => {
    if (currentIndex < detailedFlashCard?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-[38%] ">
          <span className="flex justify-center">
            <LottiePlayer animationFile={Happy} />
          </span>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#191925]">
              Yeah, completed!
            </h1>
            <p className="text-[#687494] text-[15px]">
              All of the flashcard is completed reviewing.
            </p>
          </div>

          <div className="flex gap-3 justify-center mt-10">
            <div className="rounded-xl w-[190px] h-[174px] bg-[#EEF2F6]">
              <img className="px-4 py-5" src={icon7} alt="" />
              <h1 className="text-center font-medium text-xl">
                Cards reviewed
              </h1>
              <p className="text-center leading-6 text-[15px] text-[#495D79]">
                Flashcard reviewed: {detailedFlashCard.length}
              </p>
            </div>
            <div className="rounded-xl w-[190px] h-[174px] bg-[#EEF2F6]">
              <img className="px-4 py-5" src={icon7} alt="" />
              <h1 className="text-center font-medium text-xl">Time spent</h1>
              <p className="text-center leading-6 text-[15px] text-[#495D79]">
                Time spent: 10 mins
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-35 mt-8">
          <Link to="/studentDashboard/flashcard">
            <button className="w-[180px] p-2 border cursor-pointer border-slate-300 text-[#8996A9] rounded-xl hover:bg-slate-100 transition">
              Back to Dashboard
            </button>
          </Link>
          <button className="w-[180px] p-2 bg-[#7240FD] cursor-pointer text-white rounded-xl text-[15px] hover:bg-[#5e34d9] transition">
            Continue to next lesson
          </button>
        </div>
      </div>
    );
  }

  if (detailedFlashCard.length === 0) {
    return (
<div className="flex items-center justify-center min-h-screen bg-white">
  <div className="loader border-4 border-blue-300 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
</div>
    );
  }

  const card = detailedFlashCard[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-8">
        <Link
          to="/studentDashboard/flashcard"
          className="mt-4 text-blue-500 flex items-center gap-2 text-4xl font-bold"
        >
          <FiChevronLeft />
        </Link>
        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-purple-400 rounded transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6">
        {/* Card Header */}

        <div>
          <div className="text-xs text-gray-400 font-semibold mb-2 uppercase tracking-wider">
            Card {currentIndex + 1} of {detailedFlashCard.length} • Topic{" "}
            {card?.flash_topics?.topicFlashName}
          </div>

          {/* Card Content */}
          <div className="rounded-xl flex flex-col items-center justify-center h-58 mb-4 relative">
            <img
              src={card.container.frontImage}
              alt="Flashcard"
              className="object-cover w-full h-full rounded-xl"
            />

            <div className="absolute top-3 left-3 flex gap-2">
              <button
                className="bg-white rounded-full p-2 shadow hover:bg-gray-100"
                onClick={() => {
                  if ("speechSynthesis" in window) {
                    const utterance = new SpeechSynthesisUtterance(card.hint);
                    utterance.lang = "en-US";
                    utterance.rate = 1;
                    utterance.pitch = 1;
                    speechSynthesis.speak(utterance);
                  } else {
                    alert(
                      "Sorry, your browser does not support speech synthesis."
                    );
                  }
                }}
              >
                🔊
              </button>

              <button className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-xs font-medium hover:bg-purple-200">
                {card.hint}
              </button>
            </div>
          </div>

          {/* Question */}
          <div className="text-center font-semibold text-lg mb-4">
            {card.title}
          </div>

          {/* Description */}
          <div className="text-center text-sm text-gray-500 mb-4">
            {card.description}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mb-4 mt-10">
            <div className="flex gap-4">
              <img src={icon1} alt="" />
              <img src={icon2} alt="" />
              <img src={icon3} alt="" />
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex items-center border-2 border-neutral-200 text-gray-700 rounded-md">
                <img className="w-[13%] ml-3" src={icon4} alt="" />

                <button className="text-gray-700 rounded px-3 py-2 text-sm font-semibold mr-2">
                  Spaced Repetition
                </button>
              </div>
              <div className="flex items-center border-2 border-neutral-200 text-gray-700 rounded-md">
                <img className="w-[26%] ml-3" src={icon5} alt="" />
                <button className="text-gray-700 rounded px-3 py-2 text-sm font-medium">
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Confidence Level */}
          <div className="flex items-center justify-between gap-4 mb-4 mt-10">
            <span className="text-[16px]">Confidence Level</span>
            <div className="flex gap-2">
              <button
                className={`px-6 py-3 rounded-md text-xs font-bold border-2 ${
                  card.confidance_level.confidance_level === "Low"
                    ? "bg-[#FF4D4D] text-white"
                    : "border-neutral-200 text-black"
                }`}
              >
                Low
              </button>
              <button
                className={`px-6 py-3 rounded-md text-xs font-bold border-2 ${
                  card.confidance_level.confidance_level === "Medium"
                    ? "bg-[#FFBF1B]  text-white"
                    : "border-neutral-200 text-black"
                }`}
              >
                Medium
              </button>
              <button
                className={`px-6 py-3 rounded-md text-xs font-bold border-2 ${
                  card.confidance_level.confidance_level === "High"
                    ? "bg-[#4CDBC8] text-white"
                    : "border-neutral-200 text-black"
                }`}
              >
                High
              </button>
            </div>
          </div>

          {/* Verified & Rating */}
          <div className="flex items-center justify-between mb-4 mt-10">
            <div className="flex items-center gap-2 text-sm">
              <img src={icon6} alt="" />
              Verified by Admin
            </div>
            <div className="flex items-center gap-1 text-sm">
              <div>
                <span className="font-bold text-3xl">
                  {parseFloat(card.averageRating).toFixed(1)}
                </span>
              </div>
              <span className="text-yellow-400">★</span>
              <span className="text-[#687494] text-[15px]">
                ({card.numReviews} Ratings)
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-end gap-5 mt-15">
            <button
              onClick={handlePrev}
              className="bg-gray-200 text-gray-600 rounded px-4 py-2 font-medium cursor-pointer"
              disabled={currentIndex === 0}
            >
              Previous Card
            </button>
            <button
              onClick={handleNext}
              className="bg-purple-600 text-white rounded px-6 py-2 font-medium cursor-pointer"
            >
              {currentIndex === detailedFlashCard.length - 1
                ? "Finish"
                : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardDetails;
