import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom";


function Dashboard() {
    const [timer, setTimer] = useState({ seconds: "" });
    const [text, setText] = useState("");
    const [link, setLink] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const handleTimerChange = (e) => {
        setTimer({ ...timer, [e.target.name]: e.target.value });
    };
    const handleVisibilityChange = (e) => {
        setIsVisible(e.target.checked);
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, []);
    //for url
    const handleInputChange = (e) => {
        const { value } = e.target;
        setLink(value);

        // Validate URL and set error message if needed
        if (!validateUrl(value)) {
            setError('Please enter a valid URL starting with http:// or https://');
        } else {
            setError('');
        }
    };

    const validateUrl = (url) => {
        // Regular expression to match URLs starting with http:// or https://
        const pattern = /^https?:\/\/.+$/i;
        return pattern.test(url);
    };

    const handleSubmit = async () => {
        if (!timer.seconds || !text || !link) {
            alert("All fields are required!");
            return;
        }

        const data = {
            timer: timer.seconds,
            description: text,
            link: link,
            status: isVisible
        };

        try {
            await axios.post("https://dynamic-banner-qz8e.onrender.com/api/v1/banner", data);
            alert("Banner data saved successfully");
            navigate("/");
        } catch (err) {
            console.error("Error saving banner data:", err);
            alert("Failed to save banner data");
        }
    };


    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-xl w-full">
                    <h1 className="text-5xl font-bold mb-4 text-slate-600 flex items-center justify-center">Dashboard</h1>

                    {/* Timer Settings */}
                    <div className="space-y-4 ">
                        <h2 className="text-2xl font-semibold text-gray-700">Update Timer</h2>
                        <div className="mt-6 space-y-4">

                            <input
                                type="number"
                                name="seconds"
                                value={timer.seconds}
                                onChange={handleTimerChange}
                                min="0"
                                max="59"
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                                placeholder="Seconds"
                            />

                        </div>

                        {/* Text Settings */}

                        <h2 className="text-2xl font-semibold text-gray-700 ">Update Text</h2>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                            placeholder="Banner Text"
                        />

                        {/* Link Settings */}
                        <h2 className="text-2xl font-semibold text-gray-700">Link</h2>
                        <input
                            type="url"
                            value={link}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                            placeholder="https://example.com"
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        {/* Visibility Settings */}
                        <h2 className="text-2xl font-semibold text-gray-700">Banner Visibility</h2>
                        <div className="flex items-center">
                            <label className="inline-flex items-center cursor-pointer">
                                <span className="mr-3 text-gray-700">
                                    {isVisible ? "Visible" : "Hidden"}
                                </span>
                                <input
                                    type="checkbox"
                                    checked={isVisible}
                                    onChange={(e) => setIsVisible(e.target.checked)}
                                    className="sr-only"
                                />
                                <div
                                    className={`relative w-12 h-6 flex items-center cursor-pointer rounded-full transition-colors duration-300 ${isVisible ? 'bg-slate-500' : 'bg-blue-300'
                                        }`}
                                >
                                    <div
                                        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isVisible ? 'translate-x-6' : ''
                                            }`}
                                    />
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="mt-10">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full bg-red-700 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
