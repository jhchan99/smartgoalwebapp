import React, { useState } from "react";
import GoalsForm from "./components/GoalsForm/GoalsForm";
import History from "./components/History/History";
import Header from "./components/Header/Header";
import { useGoals } from './hooks/useGoals';
import './styles/globals.css';
import Sidebar from "./components/Sidebar/Sidebar";

// TODO: Add a button to clear the history
// TODO: fix mobile views
// TODO: implement branding and logo
// TODO: implement long term storage
// TODO: implement user accounts for saving goals
// TODO: when user saves goal, if the sidebar is closed, create an animation that shaws the goal being saved to history
//      - this could be a simple notification bubble that appears on the toggle button
//      - the bubble could be a simple text bubble that says "Goal saved"
//      - the bubble could be a simple icon bubble that says "Goal saved"
//      - or if the user has unseen goals, 

const App = () => {
    const { history, setHistory, editingGoal, setEditingGoal, handleDelete, unviewedCount, markGoalsAsViewed } = useGoals();
    const [sidebarOpen, setSidebarOpen] = useState(true);

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

    return (
        <div>
            <Header 
                sidebarOpen={sidebarOpen}
                onSidebarToggle={handleSidebarToggle}
                unviewedCount={unviewedCount}
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
                    <GoalsForm 
                        history={history} 
                        setHistory={setHistory}
                        editingGoal={editingGoal}
                        setEditingGoal={setEditingGoal}
                    />
                </main>
            </div>
        </div>
    );
};

export default App;