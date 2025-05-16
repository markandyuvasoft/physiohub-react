import React, { useEffect, useState } from 'react';
import logo from "../assets/logo-on-light.png";
import signup1 from "../assets/signup1.png";
import '../App.css'
import circle from "../assets/score.png"
import LottiePlayer from './animations/LottiePlayer';
import Dead from "../components/animations/data/Happy.json"
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const CommonSignUp = () => {

    const [score, setScore] = useState(0);

    useEffect(() => {
        let direction = 1;
        let current = 0;

        const interval = setInterval(() => {
            current += direction;
            if (current >= 65) direction = -1;
            if (current <= 0) direction = 1;
            setScore(current);
        }, 20);

        return () => clearInterval(interval);
    }, []);

    

    return (
        <div>

            <div>
                <div className=' border-[#9333EA] border-2 rounded-t-2xl w-[90%] bg-[#9333EA] m-auto pl-4 text-white'>
                    <Link to={"/"}>
                        <img className='w-[35%] mt-4 text-white' src={logo} alt="" />
                    </Link>
                   

                    <div className="w-full max-w-[800px] mx-auto">
                        <Carousel autoPlay infiniteLoop  showThumbs={false} showStatus={false} interval={3000} showArrows={false}>
                            
                            <div>
                                <h1 className='text-2xl font-bold mt-4'>Build Stronger Recovery Programs</h1>
                                <p className='text-start pb-12'>Learn how to design effective and safe recovery routines for all kinds of patients.</p>

                            </div>
                            <div>

                                <h1 className='text-2xl font-bold mt-4'>Build Stronger Recovery Programs</h1>
                                <p className='text-start pb-12'>Learn how to design effective and safe recovery routines for all kinds of patients.</p>

                            </div>
                            <div>

                                <h1 className='text-2xl font-bold mt-4'>Build Stronger Recovery Programs</h1>
                                <p className='text-start pb-12'>Learn how to design effective and safe recovery routines for all kinds of patients.</p>

                            </div>
                        </Carousel>
                    </div>
                </div>

                <div className='border-2 border-[#9333EA] w-[90%] rounded-b-2xl  h-full m-auto bg-[#9333EA] pb-3'>

                    <div className='border-2 border-white w-[40%] rounded-2xl ml-20 mt-12 bg-white'>
                        <h1 className='pl-5 text-sm text-black font-medium mt-3'>Over time</h1>
                        <div className='flex justify-between ml-1 mr-1 items-center'>
                            <h2 className='ml-5 text-2xl font-bold text-black'>$40K</h2>
                            <button className='border-2 w-[22%] rounded-full bg-purple-100 text-purple-700 text-sm'>25%</button>
                        </div>
                        <p className='ml-5 text-xs text-gray-500'>Last 7 days</p>
                        <img className='p-4 rounded-2xl' src={signup1} alt="" />
                    </div>

                    <div className='border-2 w-[50%] pl-2 pr-2 border-white rounded-2xl ml-4 mt-4 bg-white'>
                        <h1 className='font-bold text-xl ml-4 mt-3 pb-2'>Performance over time</h1>

                        <div className="flex justify-between items-end">
                            {
                                ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (

                                    <div className="flex flex-col items-center" key={index}>

                                        <div className="w-[20px] h-[100px] bg-gray-100 rounded-lg overflow-hidden relative">
                                            <div className="absolute bottom-0 w-full bg-[#F593D5] rounded-sm animate-bar" style={{ animationDelay: `${index * 0.3}s` }}></div>
                                        </div>
                                        <span className="text-[12px] text-[#333]">{month}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='absolute top-85 left-95'>

                        <LottiePlayer animationFile={Dead} />
                    </div>
                    <div className=' w-[40%] p-3 bg-white rounded-2xl relative bottom-60 left-78'>

                        <h1 className='font-semibold text-center mt-2 pb-2'>Quiz Score</h1>
                        <div className="relative w-32 h-32 m-auto">
                            <svg className="transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    stroke="#eee"
                                    strokeWidth="10"
                                    fill="none"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    stroke="#9333EA"
                                    strokeWidth="10"
                                    fill="none"
                                    strokeDasharray="282.6"
                                    strokeDashoffset={282.6 - (score / 100) * 282.6}
                                />

                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-xl">
                                {score}%
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default CommonSignUp
