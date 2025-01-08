// src/App.jsx
import React from 'react';
import GoalsForm from "./components/GoalsForm/GoalsForm";

const App = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">SMART Goals Setter</h1>
                    <p className="mt-2 text-gray-600">Create and track your SMART goals effectively</p>
                </header>
            </div>
            <div className="App">
                <GoalsForm/>
            </div>
        </div>
    );
};

export default App;