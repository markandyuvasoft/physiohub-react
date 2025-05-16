import React from 'react'
import musicles from "../assets/musicls.png"
import svg6 from "../assets/svg6.png"

const FlashCard = () => {
    return (
        <div className="w-full px-4 mt-14">
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20">

                <div className="w-full md:w-1/2">
                    <p className="text-xs font-semibold text-purple-600">NO SIGN UP REQUIRED</p>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-3">Learn with Flash Cards</h1>
                    <p className="text-gray-600 mt-3">
                        Master key concepts and terms with our interactive flashcards. A perfect tool for quick revisions and reinforcing your learning, making complex information easy to remember.
                    </p>
                    <ul className="mt-4 list-disc list-inside marker:text-purple-600 marker:text-2xl">
                        <li>1000+ pre-made flashcards</li>
                        <li>Effortless Memorization with spaced repetition</li>
                        <li>Spaced repetition</li>
                    </ul>
                </div>

                <div className="w-full md:w-1/2">
                    <div className="relative rounded-xl p-6 flex justify-center items-center">
                        <img src={svg6} className="w-full h-auto object-contain" alt="" />
                        <img className="absolute w-3/4 sm:w-2/3 md:w-1/2 h-auto rounded-2xl" src={musicles} alt="Flashcard Graphic"/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FlashCard
