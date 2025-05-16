import React, { useState } from 'react';


const HomeFaq = () => {

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    const faqs = [
        {
            question: 'Who can benefit from using Physiohub?',
            answer: 'Physiohub is designed for individuals seeking physiotherapy support, professionals in the field, and clinics aiming to enhance patient care.',
        },
        {
            question: 'How often is the content updated?',
            answer: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
        {
            question: 'Do I need to create an account to use the platform?',
            answer: 'While some features are accessible without an account, registering allows access to personalized recommendations and premium content.',
        },
        {
            question: 'Is there a subscription fee to use the platform?',
            answer: 'Physiohub offers both free and premium subscription plans to cater to different user needs.',
        },
        {
            question: 'How do you handle user data and privacy?',
            answer: 'We prioritize user privacy with encrypted data storage and strict access policies, ensuring user information is secure.',
        },
        {
            question: 'Can I suggest topics or features for the platform?',
            answer: 'Absolutely! We welcome user feedback and encourage suggestions to improve our platform.',
        },
        {
            question: 'What should I do if I encounter technical issues on the platform?',
            answer: 'You can visit our Help Center for troubleshooting guides or contact our support team for assistance.',
        },
    ];

    return (
        <div className="w-full bg-[#f6f9fc] py-16 px-4">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

                <div className="lg:w-2/5 lg:mt-15">
                    <h1 className="text-purple-600 text-sm font-semibold">FAQ</h1>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2">Frequently asked questions</h2>
                    <p className="text-gray-500 font-medium mt-3 lg:mt-5">
                        Visit our <span className="text-blue-600">Help Center</span> for more information.
                    </p>
                </div>

                <div className="lg:w-3/5 lg:mt-10">
                    <div className="space-y-4">
                        {

                            faqs.map((faq, index) => (
                                <div key={index} className="border-2 p-4 bg-white shadow border-gray-200 rounded-xl transition-all duration-300">

                                    <button className="w-full text-left flex justify-between items-center font-semibold text-gray-800" onClick={() => toggleFaq(index)}>
                                        {faq.question}
                                        <span className="text-xl">{openIndex === index ? '-' : '+'}</span>
                                    </button>

                                    {openIndex === index && (
                                        <p className="mt-2 text-gray-600  text-sm">{faq.answer}</p>
                                    )}
                                </div>
                            ))

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeFaq
