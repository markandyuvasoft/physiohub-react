import React from 'react'

const HomeTestimonial = () => {


    const testimonials = [
        {
            companyLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
            feedback: "This app transformed our support operations. Response time reduced, leading to a rise in customer satisfaction.",
            userImage: "https://svgsilh.com/svg_v2/659651.svg",
            name: "Frederic Hill",
            role: "Data Engineer at Tailwind"
        },
        {
            companyLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
            feedback: "We experienced a significant reduction in support tickets thanks to the intuitive AI features. Support was prompt to assist us.",
            userImage: "https://svgsilh.com/svg_v2/659651.svg",
            name: "Safaa Sampson",
            role: "Front-end at Hubspot"
        },
        {
            companyLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
            feedback: "This software integrated seamlessly with our existing tools. It helped us manage a huge increase in customer inquiries.",
            userImage: "https://svgsilh.com/svg_v2/659651.svg",
            name: "Brendan Buck",
            role: "CEO at Google"
        }
    ];

    return (
        <div>
            <div className="w-full mt-12 bg-white pb-15">

                <div className="w-full md:w-1/2 pb-5 m-auto text-center mt-10 pt-15">
                    <p className="text-sm font-semibold text-purple-600">Testimonials</p>
                    <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 mt-2">Hear from Our Happy Users</h1>
                    <p className="text-gray-600 mt-2">Physiohub is a learning platform designed to help budding physiotherapists perfect their craft and become industry experts.</p>
                </div>

                <div className="w-full md:w-4/5 m-auto mt-5 rounded-2xl flex flex-wrap justify-center gap-7">
                    {
                        testimonials.map((testi, index) => (
                            <div key={index} className="border-2 w-full sm:w-[45%] md:w-[30%] h-full bg-gray-50 border-gray-200 rounded-2xl p-4">
                                <img className="w-[20%] mx-auto" src={testi.companyLogo} alt="Company Logo" />
                                <h1 className="text-gray-700 mt-5 text-center">{testi.feedback}</h1>

                                <div className="flex justify-center items-center mt-5">
                                    <img className="w-[25%] p-4 rounded-full" src={testi.userImage} alt="User" />
                                    <div className="ml-4">
                                        <h1 className="font-semibold">{testi.name}</h1>
                                        <p className="text-gray-500">{testi.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HomeTestimonial
