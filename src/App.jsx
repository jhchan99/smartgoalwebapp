import React from "react";
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

    return (
        <div>
            <Header />
            <div className="app-layout">
                <Sidebar unviewedCount={unviewedCount} onOpen={markGoalsAsViewed}>
                    <History 
                        history={history}
                        onEdit={setEditingGoal} 
                        onDelete={handleDelete}
                    />
                </Sidebar>
                <main className="main-content">
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