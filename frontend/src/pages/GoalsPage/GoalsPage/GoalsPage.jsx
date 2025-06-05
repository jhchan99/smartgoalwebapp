import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GoalsForm from '../../../components/GoalsFormCard/GoalsForm';
import ReminderCard from '../../../components/ReminderCard/ReminderCard';
import LoginPromptCard from '../../../components/LoginPromptCard/LoginPromptCard';
import { useAuth } from '../../../contexts/AuthContext';
import { RemindersService } from '../../../services/remindersService';
import './GoalsPage.css';

const GoalsPage = ({ history, setHistory, editingGoal, setEditingGoal, handleSaveGoal, handleUpdateGoal }) => {
    const [showReminderCard, setShowReminderCard] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [savedGoal, setSavedGoal] = useState(null);
    const [isSliding, setIsSliding] = useState(false);
    const [goalsCardAnimated, setGoalsCardAnimated] = useState(false);
    const [isSettingReminders, setIsSettingReminders] = useState(false);
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
        setShowReminderCard(false);
        setSavedGoal(null);
        goalsFormRef.current?.clearForm();
    };

    const handleReminderSet = async (reminders) => {
        if (!currentUser || !savedGoal) return;
        
        setIsSettingReminders(true);
        
        try {
            await RemindersService.setReminders(
                currentUser.uid, 
                savedGoal.id, 
                reminders
            );
            
            // Show success message
            console.log('Reminders set successfully!');
            
            setShowReminderCard(false);
            setSavedGoal(null);
            goalsFormRef.current?.clearForm();
        } catch (error) {
            console.error('Failed to set reminders:', error);
            alert('Failed to set reminders. Please try again.');
        } finally {
            setIsSettingReminders(false);
        }
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
                    handleSaveGoal={handleSaveGoal}
                    handleUpdateGoal={handleUpdateGoal}
                    ref={goalsFormRef}
                />
            </div>
            
            <div className={`reminder-card-container ${isSliding ? 'slide-in' : ''}`}>
                {showReminderCard && currentUser && (
                    <ReminderCard
                        goal={savedGoal}
                        onClose={handleReminderClose}
                        onReminderSet={handleReminderSet}
                        isLoading={isSettingReminders}
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
