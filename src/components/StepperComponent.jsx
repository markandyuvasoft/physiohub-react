import React, { useState } from 'react';
import st1 from "../assets/st1.png"
import st2 from "../assets/st2.png"
import st3 from "../assets/st3.png"
import st4 from "../assets/st4.png"
import st5 from "../assets/st5.png"
import st6 from "../assets/st6.png"
import st7 from "../assets/st7.png"
import st8 from "../assets/st8.png"
import st9 from "../assets/st9.png"
import st10 from "../assets/st10.png"
import st11 from "../assets/st11.png"
import st12 from "../assets/st12.png"
import st13 from "../assets/st13.png"
import st14 from "../assets/st14.png"
import st15 from "../assets/st15.png"
import st16 from "../assets/st16.png"
import st17 from "../assets/st17.png"
import st18 from "../assets/st18.png"
import st19 from "../assets/st19.png"
import LottiePlayer from './animations/LottiePlayer';
import Happy from "../components/animations/data/Happy.json"




const StepperComponent = () => {
    const [step, setStep] = useState(1);

    const progressPercentage = (step / 6) * 100;

    const handleNext = () => {
        if (step < 6) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };


    const setLevelArray = [

        {
            levelLogo: st1,
            levelTitle: "Beginner",
            levelDescription: "Starting to learn from the basics to build a strong foundation"
        },

        {
            levelLogo: st2,
            levelTitle: "Intermediate",
            levelDescription: "Having some experience in physiotherapy"
        },

        {
            levelLogo: st3,
            levelTitle: "Advanced",
            levelDescription: "Master advanced techniques and specialize in your field"
        },
    ]


    const setLearningLevel = [

        {
            learningLogo: st4,
            learningTitle: "Relaxed",
            learningDescription: "15 minutes per day"
        },

        {
            learningLogo: st5,
            learningTitle: "Regular",
            learningDescription: "30 minutes per day"
        },

        {
            learningLogo: st6,
            learningTitle: "Intensive",
            learningDescription: "1 hour minutes per day"
        },
    ]


    const setAreaLevel = [

        {
            areaLogo: st7,
            areaTitle: "Sports Rehabilitation",
            areaDescription: "Focus on perfomance enchacement for athletes"
        },

        {
            areaLogo: st8,
            areaTitle: "Pediatric Physiotherapy",
            areaDescription: "Specialize care for infacts, children, and adolescents "
        },

        {
            areaLogo: st9,
            areaTitle: "Neurological Physiotherapy",
            areaDescription: "Rehabilitation for individuals with neurological disorders."
        },

        {
            areaLogo: st10,
            areaTitle: "Orthopedia Physiotherapy",
            areaDescription: "Treatment for musculoskeletal injuries and conditions."
        },

        {
            areaLogo: st11,
            areaTitle: "Cardipulmonary Physiotherapy",
            areaDescription: "Improving heart & lung function through exercises."
        },

        {
            areaLogo: st12,
            areaTitle: "Geriatric Physiotherapy",
            areaDescription: "Care tailored for older adults to maintain mobility"
        },
    ]


    const setLearningGoals = [

        {
            goalsLogo: st13,
            goalsTitle: "Goal fondational Knowledge",
            goalsDescription: "Build a solid understanding of basic concepts"
        },

        {
            goalsLogo: st14,
            goalsTitle: "Prepare for exams",
            goalsDescription: "Focus on key topics to excel inyour exams"
        },

        {
            goalsLogo: st15,
            goalsTitle: "Improve clinical skills",
            goalsDescription: "Enhance your hands-on practical Knowledge"
        },

        {
            goalsLogo: st16,
            goalsTitle: "Specialize in a specific area",
            goalsDescription: "Deepen your expertise in physiotherapy"
        },
    ]



    const setLearningNotifications = [

        {
            notificationLogo: st17,
            notificationTitle: "Daily",
            notificationDescription: "Receive updates and reminders every day to stay on track"
        },

        {
            notificationLogo: st18,
            notificationTitle: "Weekly",
            notificationDescription: "Get a summary of your progress once a week"
        },

        {
            notificationLogo: st19,
            notificationTitle: "Only for important updates",
            notificationDescription: "Receive notifications only for major updates"
        }
    ]

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className='w-[65%] bg-white p-6 rounded-lg shadow mt-20'>
                        <h2 className="text-2xl font-bold mb-2 text-center">Set Your Level</h2>
                        <p className="text-gray-600 mb-4 text-center">Please Select your current level of knowledge in physiotherapy</p>

                        <div className='grid gap-4 w-[80%] m-auto'>
                            {
                                setLevelArray.map((level, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center gap-4 p-4 border border-gray-200 rounded-2xl hover:shadow-md transition duration-200 cursor-pointer bg-[#F9FAFB]'
                                    >
                                        <div className='w-20 h-20 flex justify-center items-center bg-[#F6F9FC] rounded-2xl'>
                                            <img src={level.levelLogo} alt={level.levelTitle} className='w-12 h-12 object-contain' />
                                        </div>

                                        <div>
                                            <h1 className='font-semibold text-lg'>{level.levelTitle}</h1>
                                            <p className='text-gray-500 text-sm'>{level.levelDescription}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex justify-between mt-8">
                            <button disabled className='px-4 py-2 rounded-md border-2 text-[#7240FD] cursor-not-allowed border-[#7240FD]'>l'll do this later</button>
                            <button onClick={handleNext} className='bg-[#7240FD] text-white px-4 py-2 rounded-md'>Next</button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className='w-[65%] bg-white p-6 rounded-lg shadow mt-20'>
                        <h2 className="text-2xl font-bold mb-2 text-center">Choose Your Learning Pace</h2>
                        <p className="text-gray-600 mb-4 text-center">How much time can you dedicate to learning each week?</p>

                        <div className='grid gap-4 w-[80%] m-auto'>
                            {
                                setLearningLevel.map((learning, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center gap-4 p-4 border border-gray-200 rounded-2xl hover:shadow-md transition duration-200 cursor-pointer bg-[#F9FAFB]'
                                    >
                                        <div className='w-20 h-20 flex justify-center items-center bg-[#F6F9FC] rounded-2xl'>
                                            <img src={learning.learningLogo} alt={learning.learningLogo} className='w-12 h-12 object-contain' />
                                        </div>

                                        <div>
                                            <h1 className='font-semibold text-lg'>{learning.learningTitle}</h1>
                                            <p className='text-gray-500 text-sm'>{learning.learningDescription}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex justify-between mt-8 w-[90%] m-auto">
                            <button onClick={handleBack} className='px-4 py-2 rounded-md border-2 text-[#7240FD] border-[#7240FD]'>
                                Back
                            </button>
                            <button onClick={handleNext} className='bg-[#7240FD] text-white px-6 py-2 rounded-md'>
                                Next
                            </button>
                        </div>
                    </div>
                );

            case 3:
                return (

                    <div className='w-[65%] bg-white p-6 rounded-2xl shadow mt-20'>
                        <h2 className="text-2xl font-bold mb-2 text-center">Select Your Areas of Interest</h2>
                        <p className="text-gray-600 mb-6 text-center">
                            What areas of physiotherapy are you most <br />interested in? (Select all that apply)
                        </p>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%] m-auto'>
                            {
                                setAreaLevel.map((area, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center gap-4 p-4 border border-gray-200 rounded-2xl hover:shadow-md transition duration-200 cursor-pointer bg-[#F9FAFB]'
                                    >
                                        <div className='w-20 h-20 flex justify-center items-center bg-[#F6F9FC] rounded-2xl'>
                                            <img src={area.areaLogo} alt={area.areaTitle} className='w-12 h-12 object-contain' />
                                        </div>

                                        <div>
                                            <h1 className='font-semibold text-lg'>{area.areaTitle}</h1>
                                            <p className='text-gray-500 text-sm'>{area.areaDescription}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div className="flex justify-between mt-8 w-[90%] m-auto">
                            <button onClick={handleBack} className='px-4 py-2 rounded-md border-2 text-[#7240FD] border-[#7240FD]'>
                                Back
                            </button>
                            <button onClick={handleNext} className='bg-[#7240FD] text-white px-6 py-2 rounded-md'>
                                Next
                            </button>
                        </div>
                    </div>
                );



            case 4:
                return (
                    <div className='w-[65%] bg-white p-6 rounded-lg shadow mt-20'>
                        <h2 className="text-2xl font-bold mb-2 text-center">Personalized Goals</h2>
                        <p className="text-gray-600 mb-4 text-center">What are your learning goals?</p>

                        <div className='grid gap-4 w-[80%] m-auto'>
                            {
                                setLearningGoals.map((goals, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center gap-4 p-4 border border-gray-200 rounded-2xl hover:shadow-md transition duration-200 cursor-pointer bg-[#F9FAFB]'
                                    >
                                        <div className='w-20 h-20 flex justify-center items-center bg-[#F6F9FC] rounded-2xl'>
                                            <img src={goals.goalsLogo} alt={goals.goalsLogo} className='w-12 h-12 object-contain' />
                                        </div>

                                        <div>
                                            <h1 className='font-semibold text-lg'>{goals.goalsTitle}</h1>
                                            <p className='text-gray-500 text-sm'>{goals.goalsDescription}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex justify-between mt-8 w-[90%] m-auto">
                            <button onClick={handleBack} className='px-4 py-2 rounded-md border-2 text-[#7240FD] border-[#7240FD]'>
                                Back
                            </button>
                            <button onClick={handleNext} className='bg-[#7240FD] text-white px-6 py-2 rounded-md'>
                                Next
                            </button>
                        </div>
                    </div>
                );


            case 5:
                return (
                    <div className='w-[65%] bg-white p-6 rounded-lg shadow mt-20'>
                        <h2 className="text-2xl font-bold mb-2 text-center">Notification Preferences</h2>
                        <p className="text-gray-600 mb-4 text-center">How often would you like to receive <br /> notications and reminders?</p>

                        <div className='grid gap-4 w-[80%] m-auto'>
                            {
                                setLearningNotifications.map((notification, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center gap-4 p-4 border border-gray-200 rounded-2xl hover:shadow-md transition duration-200 cursor-pointer bg-[#F9FAFB]'
                                    >
                                        <div className='w-20 h-20 flex justify-center items-center bg-[#F6F9FC] rounded-2xl'>
                                            <img src={notification.notificationLogo} alt={notification.notificationLogo} className='w-12 h-12 object-contain' />
                                        </div>

                                        <div>
                                            <h1 className='font-semibold text-lg'>{notification.notificationTitle}</h1>
                                            <p className='text-gray-500 text-sm'>{notification.notificationDescription}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="flex justify-between mt-8 w-[90%] m-auto">
                            <button onClick={handleBack} className='px-4 py-2 rounded-md border-2 text-[#7240FD] border-[#7240FD]'>
                                Back
                            </button>
                            <button onClick={handleNext} className='bg-[#7240FD] text-white px-6 py-2 rounded-md'>
                                Next
                            </button>
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className='w-[65%] bg-white p-6 rounded-lg shadow mt-20'>

                        <div className='flex justify-center pb-4'>
                            <div className=' w-[30%] h-[150px] shadow-xl'>
                                <h1 className='p-3 mt-2 font-semibold text-[#191925]'>All Set!</h1>
                                <p className='p-2 text-center text-[#495D79]'>You're ready to start learning. <br /> Let's begin your first lesson.</p>

                            </div>
                        </div>

                        <div className='flex justify-center pb-12'>
                            <LottiePlayer animationFile={Happy} />
                        </div>

                        <div className="flex justify-center">
                            <button className='bg-[#7240FD] text-white px-4 py-2 rounded-md'>Start Learning</button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {
                step === 6 ? null :

                    <div className='w-full mt-10 flex justify-center'>
                        <div className='absolute top-4 w-[65%]'>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                <div
                                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-300 mt-25 "
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                        </div>
                    </div>
            }
            <div className='w-full mt-10 flex justify-center'>
                {renderStep()}
            </div>

        </>




    );
};

export default StepperComponent;
