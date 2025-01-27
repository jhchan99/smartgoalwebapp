import React, {useState} from 'react';
import History from "../History/History";
import { DownloadIcon, ShareIcon } from '@heroicons/react/outline';

const GoalsForm = () => {

    const [goalData, setGoalData] = useState({
        specific: '',
        measurable: '',
        achievable: '',
        relevant: '',
        timebound: '',
    });

    const [history, setHistory] = useState([]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setGoalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleShareToNotes = async () => {
        const goalText = `
            SMART Goal
            -----------
            Specific: ${goalData.specific}
            Measurable: ${goalData.measurable}
            Achievable: ${goalData.achievable}
            Relevant: ${goalData.relevant}
            Time-bound: ${goalData.timebound}
        `;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My SMART Goal',
                    text: goalText,
                });
                console.log('Shared successfully!');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            alert('Web Share API is not supported in your browser.');
        }
    };

    const handleDownload = () => {
        const goalText = `
            SMART Goal
            -----------
            Specific: ${goalData.specific}
            Measurable: ${goalData.measurable}
            Achievable: ${goalData.achievable}
            Relevant: ${goalData.relevant}
            Time-bound: ${goalData.timebound}
        `;
        const blob = new Blob([goalText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'SMART_Goal.txt';
        link.click();
        URL.revokeObjectURL(url);
    };


    const handleSave = () => {
        const newGoal = {...goalData, dateSaved: new Date().toLocaleString()};

        // Add the new goal to the history state
        setHistory((prevHistory) => [newGoal, ...prevHistory]);

        // Clear the form
        setGoalData({
            specific: '',
            measurable: '',
            achievable: '',
            relevant: '',
            timebound: '',
        });
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your SMART Goal</h2>

            {/* Specific */}
            <div className="mb-4">
                <label htmlFor="specific" className="block text-sm font-medium text-gray-700 mb-2">Specific</label>
                <input
                    type="text"
                    id="specific"
                    name="specific"
                    className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="What do you want to achieve?"
                    value={goalData.specific}
                    onChange={handleChange}
                />
            </div>

            {/* Measurable */}
            <div className="mb-4">
                <label htmlFor="measurable" className="block text-sm font-medium text-gray-700 mb-2">Measurable</label>
                <input
                    type="text"
                    id="measurable"
                    name="measurable"
                    className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="How will you measure your progress?"
                    value={goalData.measurable}
                    onChange={handleChange}
                />
            </div>

            {/* Achievable */}
            <div className="mb-4">
                <label htmlFor="achievable" className="block text-sm font-medium text-gray-700 mb-2">Achievable</label>
                <textarea
                    id="achievable"
                    name="achievable"
                    className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="How will you achieve this goal?"
                    value={goalData.achievable}
                    onChange={handleChange}
                ></textarea>
            </div>

            {/* Relevant */}
            <div className="mb-4">
                <label htmlFor="relevant" className="block text-sm font-medium text-gray-700 mb-2">Relevant</label>
                <input
                    type="text"
                    id="relevant"
                    name="relevant"
                    className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Why is this goal relevant to you?"
                    value={goalData.relevant}
                    onChange={handleChange}
                />
            </div>

            {/* Time-bound */}
            <div className="mb-4">
                <label htmlFor="timebound" className="block text-sm font-medium text-gray-700 mb-2">Time-bound</label>
                <input
                    type="date"
                    id="timebound"
                    name="timebound"
                    className="w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    value={goalData.timebound}
                    onChange={handleChange}
                />
            </div>

            {/* Save Button */}
            <div>
                <button
                    type="button"
                    onClick={handleSave}
                    className="w-full bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Save Goal
                </button>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
                {/* Download */}
                <div>
                    <button
                        type="button"
                        onClick={handleDownload}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-lg"
                    >
                        <DownloadIcon className="h-5 w-5" />
                    </button>
                </div>

                {/* Save to Notes */}
                <div className="mb-4">
                    <button
                        type="button"
                        onClick={handleShareToNotes}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-lg"
                    >
                        <ShareIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
            {/* Pass History to the History Component */}
            <History history={history} />
        </div>
    );
};

export default GoalsForm;
