import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalsForm from '../../../components/GoalsFormCard/GoalsForm';
import ReminderCard from '../../../components/ReminderCard/ReminderCard';
import LoginPromptCard from '../../../components/LoginPromptCard/LoginPromptCard';
import { useAuth } from '../../../contexts/AuthContext';
import './GoalsPage.css';

const GoalsPage = ({ history, setHistory, editingGoal, setEditingGoal }) => {
    const [showReminderCard, setShowReminderCard] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [savedGoal, setSavedGoal] = useState(null);
    const [isSliding, setIsSliding] = useState(false);
    const [goalsCardAnimated, setGoalsCardAnimated] = useState(false);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const goalsFormRef = useRef();

    useEffect(() => {
        // Animate goals card on initial load
        const timer = setTimeout(() => {
            setGoalsCardAnimated(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showReminderCard || showLoginPrompt) {
            // Small delay to ensure the element is rendered before animation
            const timer = setTimeout(() => {
                setIsSliding(true);
            }, 50);
            return () => clearTimeout(timer);
        } else {
            setIsSliding(false);
        }
    }, [showReminderCard, showLoginPrompt]);

    const handleGoalSaved = (goal) => {
        setSavedGoal(goal);
        
        // If user is authenticated, show reminder card
        // If not authenticated, show login prompt
        if (currentUser) {
            setShowReminderCard(true);
        } else {
            setShowLoginPrompt(true);
        }
    };

    const handleReminderClose = () => {
        updateLatestGoal();
        setShowReminderCard(false);
        setSavedGoal(null);
        goalsFormRef.current?.clearForm();
    };

    const handleReminderSet = (reminders) => {
        // TODO: Here you'll integrate with Google Todo API
        console.log('Setting reminders:', reminders);
        updateLatestGoal();
        setShowReminderCard(false);
        setSavedGoal(null);
        goalsFormRef.current?.clearForm();
    };

    const handleLoginPromptClose = () => {
        setShowLoginPrompt(false);
        setSavedGoal(null);
        goalsFormRef.current?.clearForm();
    };

    const handleLoginPromptSignIn = () => {
        // Navigate to login page
        navigate('/login');
    };

    // Helper to update the latest goal in history
    const updateLatestGoal = () => {
        const latestGoal = goalsFormRef.current?.getCurrentGoalData();
        if (!latestGoal) return;

        // If editing, update the correct index; otherwise, update the most recent
        if (editingGoal && editingGoal.index !== undefined) {
            const updatedHistory = [...history];
            updatedHistory[editingGoal.index] = {
                ...latestGoal,
                dateSaved: new Date().toLocaleString(),
                isViewed: false,
                dateViewed: null
            };
            setHistory(updatedHistory);
        } else {
            // Replace the most recent goal (index 0)
            const updatedHistory = [...history];
            updatedHistory[0] = {
                ...latestGoal,
                dateSaved: new Date().toLocaleString(),
                isViewed: false,
                dateViewed: null
            };
            setHistory(updatedHistory);
        }
    };

    return (
        <div className={`goals-page-goals-card ${(showReminderCard || showLoginPrompt) ? 'show-reminder' : ''}`}>
            <div className={`goals-card-container ${goalsCardAnimated ? 'animated' : ''}`}>
                <GoalsForm 
                    history={history}
                    setHistory={setHistory}
                    editingGoal={editingGoal}
                    setEditingGoal={setEditingGoal}
                    onGoalSaved={handleGoalSaved}
                    setShowReminderCard={setShowReminderCard}
                    ref={goalsFormRef}
                />
            </div>
            
            <div className={`reminder-card-container ${isSliding ? 'slide-in' : ''}`}>
                {showReminderCard && currentUser && (
                    <ReminderCard
                        goal={savedGoal}
                        onClose={handleReminderClose}
                        onReminderSet={handleReminderSet}
                    />
                )}
                
                {showLoginPrompt && !currentUser && (
                    <LoginPromptCard
                        goal={savedGoal}
                        onClose={handleLoginPromptClose}
                        onLogin={handleLoginPromptSignIn}
                    />
                )}
            </div>
        </div>
    );
};

export default GoalsPage;
