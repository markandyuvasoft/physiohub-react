import React from 'react';
import logo from "../assets/logo-on-light.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <div className="bg-white w-full">

            <div className="flex flex-col md:flex-row justify-between w-[90%] max-w-7xl mx-auto py-12 gap-8">
                
                <div className="md:w-[40%]">
                    <img className="w-[40%] md:w-[25%]" src={logo} alt="Logo" />
                    <div className="flex gap-2 items-center mt-4">
                        <FontAwesomeIcon icon={faEnvelope} className="text-purple-600 text-lg" />
                        <a href="mailto:mail@example.com" className="text-purple-600 hover:underline text-sm">mail@example.com</a>
                    </div>
                </div>

                <div className="md:w-[55%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-sm">
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                        <ul className="space-y-1">
                            <li className="hover:text-gray-500 cursor-pointer">Quiz</li>
                            <li className="hover:text-gray-500 cursor-pointer">Flash Card</li>
                            <li className="hover:text-gray-500 cursor-pointer">Mock Test</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Articles</h4>
                        <ul className="space-y-1">
                            <li className="hover:text-gray-500 cursor-pointer">Our Blogs</li>
                            <li className="hover:text-gray-500 cursor-pointer">Rehab Protocols</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Resources</h4>
                        <ul className="space-y-1">
                            <li className="hover:text-gray-500 cursor-pointer">About Us</li>
                            <li className="hover:text-gray-500 cursor-pointer">Contact</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Extra</h4>
                        <ul className="space-y-1">
                            <li className="hover:text-gray-500 cursor-pointer">Customer Support</li>
                            <li className="hover:text-gray-500 cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-gray-500 cursor-pointer">Terms & Conditions</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-300">
                <div className="w-[90%] max-w-7xl mx-auto py-4">
                    <p className="text-sm text-gray-600 text-center md:text-left">
                        © Copyright 2024, PhysioHub. All Rights Reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
