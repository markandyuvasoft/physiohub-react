import React from 'react'
import svg4 from "../assets/svg4.png"
import svg5 from "../assets/svg5.png"


const HomeQuiz = () => {
    return (
        <div className="w-full px-4 mt-40">
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20">

                <div className="w-full md:w-1/2">
                    <p className="text-xs font-semibold text-[#ff7f04]">MULTIPLE CHOICE QUIZZES</p>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-3">Interesting quiz</h1>
                    <p className="text-gray-600 mt-3">
                        Designed exclusively for aspiring and practicing physiotherapists, our comprehensive quizzes are crafted to enhance your knowledge, skills, and confidence.
                    </p>
                    <ul className="mt-4 list-disc list-inside marker:text-[#ff7f04] marker:text-2xl">
                        <li>Time-based quizzes to improve your quick thinking and diagnostics</li>
                        <li>Personalized Dashboard</li>
                        <li>Accessible anywhere anytime</li>
                    </ul>
                </div>

                <div className="w-full md:w-1/2 bg-gradient-to-r from-[#fff7ed] to-[#fff7ed] rounded-xl">
                    <div className="relative rounded-2xl p-5 flex justify-center items-center">

                        <img src={svg4} alt="" className="absolute h-full object-contain" />

                        <div className="flex flex-col items-center">
                            <img className='w-[80%]' src={svg5} alt="" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeQuiz
