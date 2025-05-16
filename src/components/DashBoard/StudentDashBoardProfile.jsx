import React from "react";
import message1 from "../../assets/message1.png";
import checklist from "../../assets/checklist.png";
import light from "../../assets/light.png";
import performance from "../../assets/performance.png";
import avtar from "../../assets/avatar.png";
import price from "../../assets/price.png";
import LottiePlayer from "../animations/LottiePlayer";
import Dead from "../../components/animations/data/Hi.json";
import StudentActivityTracker from "./StudentActivityTracker";

const StudentDashBoardProfile = () => {
  const details = [
    { companyLogo: message1, value: "234", name: "My flashcards" },
    { companyLogo: checklist, value: "29", name: "Quiz Completed" },
    { companyLogo: light, value: "200", name: "Longest Streak" },
  ];

 

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto flex justify-between space-x-8">
        <div className="w-1/2">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Hello Alaska!
          </h1>

          <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl shadow-md p-6 mb-6">
            <div className="text-white flex justify-between items-center">
              <div>
                <h1 className="font-medium text-lg mb-2">
                  Total Lessons Completed
                </h1>
                <h2 className="text-4xl font-bold">128</h2>
              </div>
              <div className="w-24 h-24">
                <LottiePlayer animationFile={Dead} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {details.map((data, index) => (
              <div key={index} className="bg-white shadow-sm rounded-xl p-6">
                <img
                  className="w-10 h-10 mb-2"
                  src={data.companyLogo}
                  alt={data.name}
                />
                <h1 className="text-3xl font-bold text-gray-800">
                  {data.value}
                </h1>
                <p className="text-gray-500 text-sm mt-1">{data.name}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h1 className="font-semibold text-xl mb-3 text-gray-800">
              Performance over time
            </h1>
            <img src={performance} alt="Performance Chart" className="w-full" />
          </div>

          <StudentActivityTracker />
        </div>

        <div className="w-full md:w-1/3 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                <img
                  src={avtar}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                Markand dighe
              </h2>
              <p className="text-sm text-gray-600">markanddighe@gmail.com</p>

              <div className="flex justify-between w-full bg-gray-100 rounded-lg mt-4 p-4">
                <div className="text-center w-1/2">
                  <h1 className="text-lg font-bold text-gray-800">3</h1>
                  <p className="flex items-center justify-center gap-1 text-sm text-gray-600">
                    <img src={price} className="w-4 h-4" alt="Rank Icon" />
                    Rank
                  </p>
                </div>
                <div className="border-l border-gray-300"></div>
                <div className="text-center w-1/2">
                  <h1 className="text-lg font-bold text-gray-800">2</h1>
                  <p className="flex items-center justify-center gap-1 text-sm text-gray-600">
                    <img src={price} className="w-4 h-4" alt="Points Icon" />
                    Points
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Leaderboard
            </h2>

            {/* Header Row */}
            <div className="flex justify-between text-sm text-gray-500 mb-2 px-1">
              <div className="flex items-center gap-2 w-2/3">
                <div className="w-1/4">Rank</div>
                <div className="w-3/4">Name</div>
              </div>
              <div className="w-1/3 text-right">Points</div>
            </div>

            {/* Leaderboard Items */}
            <div className="space-y-3">
              {[
                {
                  rank: "1st",
                  show: "beginner",
                  name: "David Watson",
                  points: 15,
                },
                { rank: "2nd", show: "advance", name: "Teacher", points: 12 },
                {
                  rank: "3rd",
                  show: "pro",
                  name: "abhishek gurjar",
                  points: 2,
                },
              ].map((user, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-2 w-2/3">
                    <div className="w-1/4  font-semibold">
                      {user.rank}
                    </div>

                    <div className="w-3/4 flex items-center gap-2">
                      <img
                        src={avtar}
                        alt="Avatar"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span>
                        <p className="text-sm text-gray-800">{user.name}</p>
                        <div className="w-sm text-xs">{user.show}</div>
                      </span>
                    </div>
                  </div>
                  <div className="w-1/3 text-right text-sm text-gray-600">
                    {user.points}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashBoardProfile;
