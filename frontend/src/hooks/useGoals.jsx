import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { GoalsService } from '../services/goalsService';

const STORAGE_KEY = 'smartgoal-app-goals';

export function useGoals() {
  const { currentUser } = useAuth();
  const [history, setHistory] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load goals when user changes
  useEffect(() => {
    const loadGoals = async () => {
      if (currentUser) {
        // User is authenticated - load from Firestore
        setLoading(true);
        setError(null);
        
        try {
          // First, try to migrate any local storage data
          const localGoals = localStorage.getItem(STORAGE_KEY);
          if (localGoals && JSON.parse(localGoals).length > 0) {
            console.log('Migrating local storage to Firestore...');
            await GoalsService.migrateLocalStorageToFirestore(currentUser.uid);
          }

          // Load user's goals from Firestore
          const userGoals = await GoalsService.getUserGoals(currentUser.uid);
          setHistory(userGoals);
        } catch (err) {
          console.error('Error loading user goals:', err);
          setError('Failed to load your goals. Please try again.');
          
          // Fallback to local storage if Firestore fails
          loadLocalGoals();
        } finally {
          setLoading(false);
        }
      } else {
        // User is not authenticated - use local storage
        loadLocalGoals();
      }
    };

    loadGoals();
  }, [currentUser]);

  const loadLocalGoals = () => {
    try {
      const savedGoals = localStorage.getItem(STORAGE_KEY);
      setHistory(savedGoals ? JSON.parse(savedGoals) : []);
    } catch (error) {
      console.error('Error loading goals from localStorage:', error);
      setHistory([]);
    }
  };

  // Save to localStorage for anonymous users
  useEffect(() => {
    if (!currentUser && history.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      } catch (error) {
        console.error('Error saving goals to localStorage:', error);
      }
    }
  }, [history, currentUser]);

  const handleSaveGoal = async (goalData) => {
    try {
      if (currentUser) {
        // Save to Firestore
        const savedGoal = await GoalsService.saveGoal(currentUser.uid, goalData);
        setHistory(prev => [savedGoal, ...prev]);
        return savedGoal;
      } else {
        // Save locally
        const goalWithMetadata = {
          ...goalData,
          id: Date.now().toString(), // Simple ID for local storage
          dateSaved: new Date().toISOString(),
          isViewed: false,
          dateViewed: null
        };
        setHistory(prev => [goalWithMetadata, ...prev]);
        return goalWithMetadata;
      }
    } catch (error) {
      console.error('Error saving goal:', error);
      setError('Failed to save goal. Please try again.');
      throw error;
    }
  };

  const handleUpdateGoal = async (goalId, updatedData) => {
    try {
      if (currentUser) {
        // Update in Firestore
        await GoalsService.updateGoal(goalId, updatedData);
        setHistory(prev => prev.map(goal => 
          goal.id === goalId ? { ...goal, ...updatedData } : goal
        ));
      } else {
        // Update locally
        setHistory(prev => prev.map(goal => 
          goal.id === goalId ? { ...goal, ...updatedData } : goal
        ));
      }
    } catch (error) {
      console.error('Error updating goal:', error);
      setError('Failed to update goal. Please try again.');
      throw error;
    }
  };

  const handleDelete = async (goalId, index) => {
    try {
      if (currentUser) {
        // Delete from Firestore
        await GoalsService.deleteGoal(goalId);
        setHistory(prev => prev.filter(goal => goal.id !== goalId));
      } else {
        // Delete locally
        setHistory(prev => prev.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
      setError('Failed to delete goal. Please try again.');
      throw error;
    }
  };

  const unviewedCount = history.filter(goal => !goal.isViewed).length;

  const markGoalsAsViewed = async () => {
    try {
      const unviewedGoals = history.filter(goal => !goal.isViewed);
      
      if (currentUser && unviewedGoals.length > 0) {
        // Update in Firestore
        const goalIds = unviewedGoals.map(goal => goal.id);
        await GoalsService.markGoalsAsViewed(currentUser.uid, goalIds);
      }

      // Update local state
      setHistory(currentHistory => 
        currentHistory.map(goal => 
          goal.isViewed ? goal : { 
            ...goal, 
            isViewed: true, 
            dateViewed: new Date().toISOString() 
          }
        )
      );
    } catch (error) {
      console.error('Error marking goals as viewed:', error);
      setError('Failed to update goal status.');
    }
  };

  return {
    history,
    setHistory,
    editingGoal,
    setEditingGoal,
    handleDelete,
    handleSaveGoal,
    handleUpdateGoal,
    unviewedCount,
    markGoalsAsViewed,
    loading,
    error,
    isAuthenticated: !!currentUser
  };
}