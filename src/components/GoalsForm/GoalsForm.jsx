import React from 'react';

const GoalsForm = () => {
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
                />
            </div>

            {/* Submit Button */}
            <div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Create Goal
                </button>
            </div>
        </div>
    );
};

export default GoalsForm;
