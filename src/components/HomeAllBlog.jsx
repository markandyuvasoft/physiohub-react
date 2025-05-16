import React from 'react';
import blog from "../assets/blog.png";
import ribben from "../assets/ribben.png";
import { Link } from 'react-router-dom';

const HomeAllBlog = () => {
    const blogPosts = [
        {
            category: "Muscle",
            title: "Rehab after total knee replacement",
            author: "Dr. Alexander",
            image: blog,
        },
        {
            category: "Cardiovascular",
            title: "Rehab after total knee replacement",
            author: "Dr. Alexander",
            image: blog,
        },
        {
            category: "Muscle",
            title: "Rehab after total knee replacement",
            author: "Dr. Alexander",
            image: blog,
        },
    ];

    return (
        <div className="bg-[#f6f9fc] w-full pb-8">
            {/* Blog Section */}
            <div className="w-[90%] max-w-7xl mx-auto mt-12">
                <h1 className="text-purple-600 text-sm font-semibold pt-6">Courses</h1>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-2 gap-4">
                    <h2 className="text-3xl md:text-4xl font-bold">Explore all our Courses</h2>

                    <Link to="/login">
                    <button className="w-full md:w-auto px-6 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium cursor-pointer">Read More</button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {blogPosts.map((blogs, index) => (
                        <div key={index} className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden p-2">
                            <img className="w-full h-48 object-cover rounded-xl" src={blogs.image} alt="blog" />
                            <div className="p-4">
                                <h3 className="text-sm text-purple-600 font-medium">{blogs.category}</h3>
                                <h2 className="text-lg font-semibold text-gray-900 mt-1">{blogs.title}</h2>
                                <p className="text-gray-600 font-semibold mt-2">{blogs.author}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Learning Partner Section */}
            <div className="w-[90%] max-w-7xl mx-auto mt-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-[40%]">
                        <img src={ribben} alt="ribbon" className="w-full h-auto object-contain" />
                    </div>
                    <div className="w-full md:w-[60%] p-6 text-center text-white">
                        <h1 className="text-sm font-semibold">⭐ TOP #1 EXPERT-LED COURSES</h1>
                        <h2 className="text-3xl md:text-5xl font-bold mt-2 leading-tight">Make physiohub your <br /> learning partner</h2>
                        <p className="text-base md:text-lg mt-3 opacity-90">
                            Maximize your physiotherapy skills with our expert-led courses and tailored resources.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
                            <button className="px-6 py-3 rounded-full bg-white text-purple-600 font-semibold w-full sm:w-auto">
                                Get Started
                            </button>
                            <button className="px-6 py-3 rounded-full bg-gray-200 border border-gray-300 text-black font-semibold w-full sm:w-auto">
                                Complete Quiz
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeAllBlog;
