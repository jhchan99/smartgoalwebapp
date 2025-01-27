// src/App.jsx
import React from 'react';
import GoalsForm from "./components/GoalsPage/GoalsForm";
import SimpleFooter from "./components/Footer/Footer";
import Header from "./components/Header/Header";

const App = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header/>
            <div className="container mx-auto">
                <header className="text-center mb-8 mt-8">
                    <h1 className="text-3xl font-bold text-gray-900">SMART Goals</h1>
                    <p className="mt-2 text-gray-600">Create and track your SMART goals effectively</p>
                </header>
            </div>
            <div className="App">
                <GoalsForm/>
            </div>

            {/* Footer */}
            <SimpleFooter/>
        </div>
    );
};

export default App;