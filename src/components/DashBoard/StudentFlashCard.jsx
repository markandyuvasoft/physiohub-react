import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { ApiGetDetails } from "../../Axios/ApiRequirest";
import { useNavigate } from "react-router-dom";

const StudentFlashCard = () => {
  const token = localStorage.getItem("loginToken");
  const navigate = useNavigate();

  const star = [1, 2, 3, 4, 5];

  const [allFlashCard, setAllFlashCard] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const handelAllFlashCard = async () => {
      try {
        const response = await ApiGetDetails("found-all-card", token);
        console.log(response, "all flash card");
        setAllFlashCard(response.data.allFleshCard);
      } catch (error) {
        console.error("Failed to fetch flashcards", error);
        setAllFlashCard([]); 
      } finally {
        setLoading(false); 
      }
    };
    handelAllFlashCard();
  }, [token]);

  const handleFlahCardDetailed = (subject) => {
    navigate(`/flashcard/${subject}`);
  };

  return (
    <div>
      <div className="w-[90%] m-auto">
        <h1 className="font-semibold text-3xl">All Flashcards</h1>
        <p className="my-2">
          A perfect tool for quick revisions and reinforcing your learning,
          making complex information easy to remember.
        </p>

        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Search by topic or flashcard"
            className="w-[35%] pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5 cursor-pointer" />
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="loader border-4 border-blue-300 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : allFlashCard.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486811.png"
              alt="No data"
              className="w-32 h-32 mb-4 opacity-70"
            />
            <h2 className="text-xl font-semibold text-gray-600">No Flashcards Found</h2>
            <p className="text-sm text-gray-400 mt-2">
              Try adding some flashcards or check back later.
            </p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {allFlashCard.map((allFlash, index) => (
              <div
                key={index}
                className="border-2 border-gray-300 rounded-xl flex flex-col h-full"
              >
                <div className="h-[200px]">
                  <img
                    className="rounded-3xl p-2 h-full w-full object-cover"
                    src={allFlash.flashImage}
                    alt="Flashcard"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between p-4">
                  <div>
                    <h2 className="font-bold text-lg">{allFlash.title}</h2>
                    <p className="text-sm mt-1">{allFlash.description}</p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      {star.map((stars, index) => (
                        <FontAwesomeIcon
                          key={index}
                          icon={fullStar}
                          className={
                            index < allFlash.averageRating
                              ? "text-yellow-400"
                              : "text-gray-400"
                          }
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-1 font-semibold">
                        ({allFlash.numReviews})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 mt-auto">
                  <button
                    onClick={() => handleFlahCardDetailed(allFlash.subject)}
                    className="w-full rounded-lg border border-purple-600 text-purple-700 font-semibold py-2 cursor-pointer"
                  >
                    View FlashCards
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentFlashCard;
