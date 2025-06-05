import React, { useState } from "react";
import GoalsPage from "./pages/GoalsPage/GoalsPage/GoalsPage.jsx";
import History from "./components/History/History.jsx";
import Header from "./components/Header/Header.jsx";
import { useGoals } from './hooks/useGoals.jsx';
import './styles/globals.css';
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// TODO: Add a button to clear the history
// TODO: fix mobile views
// TODO: implement branding and logo
// TODO: implement long term storage
// TODO: implement user accounts for saving goals
// TODO: suggestions for goals, as user is typing, we will have suggestions for the length of the goal

const AppContent = () => {
    const { history, setHistory, editingGoal, setEditingGoal, handleDelete, unviewedCount, markGoalsAsViewed } = useGoals();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { currentUser, loading } = useAuth();

    const handleSidebarToggle = () => {
        const newOpenState = !sidebarOpen;
        setSidebarOpen(newOpenState);
        
        // Mark goals as viewed when opening sidebar
        if (newOpenState && unviewedCount > 0) {
            markGoalsAsViewed();
        }
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    // Show loading screen while checking authentication
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route 
                    path="/login" 
                    element={currentUser ? <Navigate to="/" /> : <Login />} 
                />
                <Route 
                    path="/signup" 
                    element={currentUser ? <Navigate to="/" /> : <Signup />} 
                />
                <Route
                    path="/"
                    element={
                        <div>
                            <Header 
                                sidebarOpen={sidebarOpen}
                                onSidebarToggle={handleSidebarToggle}
                                unviewedCount={unviewedCount}
                                currentUser={currentUser}
                            />
                            <div className="app-layout">
                                <Sidebar 
                                    isOpen={sidebarOpen}
                                    onClose={handleSidebarClose}
                                    unviewedCount={unviewedCount}
                                >
                                    <History 
                                        history={history}
                                        onEdit={setEditingGoal} 
                                        onDelete={handleDelete}
                                    />
                                </Sidebar>
                                <main className={`main-content ${sidebarOpen ? 'with-sidebar' : ''}`}>
                                    <GoalsPage 
                                        history={history} 
                                        setHistory={setHistory}
                                        editingGoal={editingGoal}
                                        setEditingGoal={setEditingGoal}
                                    />
                                </main>
                            </div>
                        </div>
                    }
                />
                {/* Redirect unknown routes to main page (no forced login) */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;