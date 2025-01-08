import React, { useState, useEffect } from 'react';

const History = () => {
    const [history, setHistory] = useState([]);

    // Load history from localStorage when the component mounts
    useEffect(() => {
        const savedGoals = JSON.parse(localStorage.getItem('smartGoals')) || [];
        setHistory(savedGoals);
    }, []);

    return (
        <div className="mt-8 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Goal History</h3>
            {history.length === 0 ? (
                <p className="text-gray-600">No goals saved yet.</p>
            ) : (
                <ul className="space-y-4">
                    {history.map((goal, index) => (
                        <li key={index} className="p-4 border border-gray-300 rounded-lg shadow-sm">
                            <p><strong>Specific:</strong> {goal.specific}</p>
                            <p><strong>Measurable:</strong> {goal.measurable}</p>
                            <p><strong>Achievable:</strong> {goal.achievable}</p>
                            <p><strong>Relevant:</strong> {goal.relevant}</p>
                            <p><strong>Time-bound:</strong> {goal.timebound}</p>
                            <p className="text-sm text-gray-500">Saved on: {goal.dateSaved}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default History;
