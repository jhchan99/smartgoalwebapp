import React, { useState, useEffect } from 'react';
import GoalsForm from '../../components/GoalsFormCard/GoalsForm';
import ReminderCard from '../../components/ReminderCard/ReminderCard';
import './GoalsPage.css';

const GoalsPage = ({ history, setHistory, editingGoal, setEditingGoal }) => {
    const [showReminderCard, setShowReminderCard] = useState(false);
    const [savedGoal, setSavedGoal] = useState(null);
    const [isSliding, setIsSliding] = useState(false);
    const [goalsCardAnimated, setGoalsCardAnimated] = useState(false);

    useEffect(() => {
        // Animate goals card on initial load
        const timer = setTimeout(() => {
            setGoalsCardAnimated(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showReminderCard) {
            // Small delay to ensure the element is rendered before animation
            const timer = setTimeout(() => {
                setIsSliding(true);
            }, 50);
            return () => clearTimeout(timer);
        } else {
            setIsSliding(false);
        }
    }, [showReminderCard]);

    const handleGoalSaved = (goal) => {
        setSavedGoal(goal);
        setShowReminderCard(true);
    };

    const handleReminderClose = () => {
        setShowReminderCard(false);
        setSavedGoal(null);
    };

    const handleReminderSet = (reminders) => {
        console.log('Reminders set:', reminders);
        setShowReminderCard(false);
        setSavedGoal(null);
    };

    return (
        <div className={`goals-page-goals-card ${showReminderCard ? 'show-reminder' : ''}`}>
            <div className={`goals-card-container ${goalsCardAnimated ? 'animated' : ''}`}>
                <GoalsForm 
                    history={history}
                    setHistory={setHistory}
                    editingGoal={editingGoal}
                    setEditingGoal={setEditingGoal}
                    onGoalSaved={handleGoalSaved}
                    setShowReminderCard={setShowReminderCard}
                />
            </div>
            
            <div className={`reminder-card-container ${isSliding ? 'slide-in' : ''}`}>
                {showReminderCard && (
                    <ReminderCard
                        goal={savedGoal}
                        onClose={handleReminderClose}
                        onReminderSet={handleReminderSet}
                    />
                )}
            </div>
        </div>
    );
};

export default GoalsPage;
