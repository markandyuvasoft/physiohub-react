import React from 'react'
import svg2 from "../assets/svg2.png"
import svg1 from "../assets/svg1.png"
import svg3 from "../assets/svg3.png"


const HomeBlog = () => {
    return (
        <div className="w-full px-4 mt-40">
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20">

                <div className="w-full md:w-1/2 ">
                    <p className="text-xs font-semibold text-[#2ccfb9]">INFORMATIVE ARTICLES</p>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-3">Informative Blogs</h1>
                    <p className="text-gray-600 mt-3">
                        Stay updated with the latest trends, research, and best practices in physiotherapy. Our blogs are written by experienced professionals, providing valuable insights and continuous learning opportunities.
                    </p>
                    <ul className="mt-4 list-disc list-inside marker:text-[#2ccfb9] marker:text-2xl">
                        <li>75+ informative articles and rehab protocols</li>
                        <li>No sign up required, access our blog completely free</li>
                        <li>Complete guide to physio</li>
                    </ul>
                </div>

                <div className="w-full md:w-1/2 bg-gradient-to-r from-gray-100 to-purple-100 rounded-xl">
                    <div className="relative rounded-2xl p-5 flex justify-center items-center">

                        <img src={svg2} alt="" className="absolute w-full h-full object-contain" />

                        <div className="flex flex-col items-center">
                            <img className='w-[80%]' src={svg1} alt="" />
                            <img className='w-[60%]' src={svg3} alt="" />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default HomeBlog
