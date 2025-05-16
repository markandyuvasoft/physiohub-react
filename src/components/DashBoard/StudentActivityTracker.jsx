import React, { useState, useEffect } from 'react';
import { ApiGetDetailsParams } from '../../Axios/ApiRequirest';

const StudentActivityTracker = () => {
    const [date, setDate] = useState(new Date());
    const [days, setDays] = useState([]);
    const [attandanceDeatils, setAttandanceDeatils] = useState({});

    const token = localStorage.getItem("loginToken");
    const studentId = localStorage.getItem("loginId");

    useEffect(() => {
        const handlePresentAbs = async () => {
            try {
                const response = await ApiGetDetailsParams("user/get-attandance", token, studentId);
                console.log(response.data.attendance, "attendance details");
                setAttandanceDeatils(response.data.attendance || {});
            } catch (error) {
                console.error("Error fetching attendance:", error);
            }
        };

        handlePresentAbs();
    }, [token, studentId]);

    useEffect(() => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const startDay = new Date(year, month, 1).getDay();

        const newDays = [];

        for (let i = 0; i < startDay; i++) newDays.push(null);

        for (let i = 1; i <= totalDays; i++) {
            const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            newDays.push({ day: i, status: attandanceDeatils[fullDate] || null });
        }

        setDays(newDays);
    }, [date, attandanceDeatils]);
    

    const changeMonth = (step) =>
        setDate(new Date(date.getFullYear(), date.getMonth() + step, 1));

    return (
        <div className="p-6 rounded-xl bg-white shadow-md w-full mt-6">
            <h2 className="text-xl font-semibold mb-4">Activity Tracker</h2>

            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)}>&lt;</button>
                <span>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                <button onClick={() => changeMonth(1)}>&gt;</button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="text-gray-500">{d}</div>
                ))}

                {days.map((d, i) => (
                    <div
                        key={i}
                        className={`h-8 w-8 flex items-center justify-center rounded-full text-sm
                            ${d?.status === 'present' ? 'bg-green-200 text-green-800 font-semibold' :
                                d?.status === 'absent' ? 'bg-red-200 text-red-800 font-semibold' : 'text-gray-400'}`}>
                        {d?.day || ''}
                    </div>
                ))}
            </div>

            <div className="flex gap-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-200 rounded-full"></div>Present
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-200 rounded-full"></div>Absent
                </div>
            </div>
        </div>
    );
};

export default StudentActivityTracker;
