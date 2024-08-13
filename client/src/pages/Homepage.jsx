import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Banner = () => {
    const [bannerText, setBannerText] = useState('');
    const [bannerLink, setBannerLink] = useState('');
    const [timeLeft, setTimeLeft] = useState({ seconds: 0 });
    const [isVisible, setIsVisible] = useState(false);

    // Fetch banner data from the backend
    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await fetch('https://dynamic-banner-qz8e.onrender.com/api/v1/banner'); // Replace with your backend API endpoint
                const data = await response.json();

                setBannerText(data.description);
                setBannerLink(data.link);
                setTimeLeft({ seconds: data.timer });
                setIsVisible(data.status);
            } catch (err) {
                console.error('Error fetching banner data:', err);
            }
        };

        fetchBannerData();
    }, []);

    // Timer countdown logic
    useEffect(() => {
        if (timeLeft.seconds > 0 && isVisible) {
            const timerInterval = setInterval(() => {
                setTimeLeft((prevTime) => ({
                    seconds: prevTime.seconds - 1,
                }));
            }, 1000);

            return () => clearInterval(timerInterval); // Clear the interval on component unmount
        } else if (timeLeft.seconds === 0) {
            setIsVisible(false); // Hide the banner when the timer reaches 0
        }
    }, [timeLeft.seconds, isVisible]);

    return (
        <>
            <Navbar />
            <div className='min-h-4 pt-20 bg-gradient-to-br from-slate-100 to-grey-100 flex items-center justify-center flex-col'>
                {isVisible ? (
                    <div
                        className={`bg-white rounded-lg shadow-2xl p-4 max-w-4xl w-full text-center transform hover:scale-105 transition-transform duration-300`}
                    >
                        <h1 className="text-4xl font-bold mb-6 text-slate-600">{bannerText}</h1>
                        <p className="text-xl mb-6 text-gray-700">Time left:</p>
                        <div className="flex justify-center space-x-4 mb-8">
                            <div key="seconds" className="text-center">
                                <div className="bg-slate-100 rounded-lg p-3">
                                    <div className="text-5xl font-bold text-slate-500 mb-2">
                                        {timeLeft.seconds.toString().padStart(2, "0")}
                                    </div>
                                    <div className="text-sm uppercase text-slate-400">Seconds</div>
                                </div>
                            </div>
                        </div>
                        <Link
                            to={bannerLink}
                            target="_blank"
                            className="mt-8 bg-red-500 hover:bg-slate-600 text-white font-bold py-3 px-16 rounded-full transition-colors duration-300"
                        >
                            Click here!
                        </Link>
                    </div>
                ) : (
                    // Placeholder when banner is not visible
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-700 mb-4">Banner Hidden</h1>
                        <p className="text-xl text-gray-500">
                            The banner has been hidden. Please check back later.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Banner;
