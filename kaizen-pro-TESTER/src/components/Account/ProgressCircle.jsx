import React from 'react';

const ProgressCircle = ({ completionPercentage }) => {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Progress</h2>
            <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#eee" strokeWidth="8" />
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#4caf50" strokeWidth="8"
                        strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                        transform="rotate(-90 50 50)" />
                <text x="50" y="55" fill="#4caf50" fontSize="15" textAnchor="middle">
                    {`${completionPercentage.toFixed(0)}%`}
                </text>
            </svg>
        </div>
    );
};

export default ProgressCircle;
