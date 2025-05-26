import { useState, useEffect } from 'react';

const STORAGE_KEY = 'smartgoal-app-goals';

export function useGoals() {
  // Initialize state with data from localStorage if available
  const [history, setHistory] = useState(() => {
    try {
      const savedGoals = localStorage.getItem(STORAGE_KEY);
      return savedGoals ? JSON.parse(savedGoals) : [];
    } catch (error) {
      console.error('Error loading goals from localStorage:', error);
      return [];
    }
  });
  
  const [editingGoal, setEditingGoal] = useState(null);

  // Save to localStorage whenever history changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving goals to localStorage:', error);
    }
  }, [history]);

  const handleDelete = (index) => {
    setHistory(history => history.filter((_, i) => i !== index));
  };

  // ...other handlers

  return {
    history,
    setHistory,
    editingGoal,
    setEditingGoal,
    handleDelete,
    // ...other handlers
  };
}