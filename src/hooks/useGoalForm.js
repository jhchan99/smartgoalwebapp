// Custom hook for managing goal form state and operations
import { useState, useEffect, useCallback, useRef } from 'react';
import { generateGoalTitle, hasEnoughContentForGeneration } from '../services/titleGenerationService';
import { debounce } from '../utils/debounce';
import { createEmptyGoal, hasGoalContent } from '../utils/goalFormUtils';

export const useGoalForm = (history, setHistory, editingGoal, setEditingGoal) => {
    const [goalData, setGoalData] = useState(createEmptyGoal);
    const [generatedTitle, setGeneratedTitle] = useState('');
    const [customTitle, setCustomTitle] = useState('');
    const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    // Title generation function
    const generateTitle = useCallback(async (formData) => {
        if (!hasEnoughContentForGeneration(formData) || customTitle) {
            return setGeneratedTitle('');
        }
        
        setIsGeneratingTitle(true);
        
        setTimeout(() => {
            const title = generateGoalTitle(formData);
            setGeneratedTitle(title);
            setIsGeneratingTitle(false);
        }, 800);
    }, [customTitle]);

    // Debounced title generation
    const debouncedGenerateTitle = useRef(null);

    useEffect(() => {
        debouncedGenerateTitle.current = debounce(generateTitle, 1200);
    }, [generateTitle]);

    // Load editing goal into form
    useEffect(() => {
        if (editingGoal) {
            setGoalData(editingGoal.goal);
            setIsEditing(true);
            setEditingIndex(editingGoal.index);
            if (editingGoal.goal.title) {
                setCustomTitle(editingGoal.goal.title);
                setGeneratedTitle('');
            }
        }
    }, [editingGoal]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newGoalData = {
            ...goalData,
            [name]: value,
        };
        setGoalData(newGoalData);

        if (!customTitle && debouncedGenerateTitle.current) {
            debouncedGenerateTitle.current(newGoalData);
        }
    };

    // Handle title editing
    const handleTitleEdit = (newTitle) => {
        setCustomTitle(newTitle);
        if (newTitle.trim()) {
            setGeneratedTitle('');
        }
    };

    // Save goal
    const handleSave = () => {
        if (!hasGoalContent(goalData)) {
            alert('Please fill in at least one field before saving your goal.');
            return false;
        }

        const finalTitle = customTitle || generatedTitle || 'Untitled Goal';
        const goalToSave = { ...goalData, title: finalTitle };

        if (isEditing && editingIndex !== null) {
            const updatedHistory = [...history];
            updatedHistory[editingIndex] = { 
                ...goalToSave, 
                dateSaved: new Date().toLocaleString(),
                isViewed: history[editingIndex]?.isViewed || false
            };
            setHistory(updatedHistory);
            setIsEditing(false);
            setEditingIndex(null);
            setEditingGoal(null);
        } else {
            setHistory([{ 
                ...goalToSave, 
                dateSaved: new Date().toLocaleString(),
                isViewed: false,
                dateViewed: null
            }, ...history]);
        }
        
        clearForm();
        return true; // Indicate successful save
    };

    // Clear form
    const clearForm = () => {
        setGoalData(createEmptyGoal());
        setGeneratedTitle('');
        setCustomTitle('');
        setIsEditing(false);
        setEditingIndex(null);
        setEditingGoal(null);
    };

    // Get final title for operations
    const getFinalTitle = () => customTitle || generatedTitle || 'Untitled Goal';

    return {
        goalData,
        generatedTitle,
        customTitle,
        isGeneratingTitle,
        isEditing,
        hasContent: hasGoalContent(goalData),
        handleChange,
        handleTitleEdit,
        handleSave,
        clearForm,
        getFinalTitle
    };
}; 