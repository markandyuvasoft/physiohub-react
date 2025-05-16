import React from 'react'
import dashboard from "../assets/dashboard.webp"

const HomeDashboard = () => {
    return (
        <div>
            <div className="w-full mt-12 bg-[#f6f9fc] pb-15">

                <div className="w-full md:w-1/2 text-center mx-auto mt-10 pt-15">
                    <p className="text-sm font-semibold text-purple-600">YOUR OWN DASHBOARD</p>
                    <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-900 mt-2">The Tools You Really Need</h1>
                    <p className="text-gray-600 mt-2">
                        Physiohub is a learning platform designed to help budding physiotherapists perfect their craft and become industry experts.
                    </p>
                </div>

                <div className="w-full md:w-4/5 m-auto mt-5 rounded-2xl">
                    <img className="w-full rounded-2xl" src={dashboard} alt="Dashboard" />
                </div>
            </div>
        </div>
    )
}

export default HomeDashboard
