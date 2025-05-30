import React, {useState, useEffect, useCallback, useRef} from 'react';
import { ShareIcon, DownloadIcon, TrashIcon } from '@heroicons/react/outline';
import './GoalsForm.css';
import Goal from '../../models/Goal';
import GeneratedTitleDisplay from './GeneratedTitleDisplay';
import { generateGoalTitle, hasEnoughContentForGeneration } from '../../services/titleGenerationService';
import { debounce } from '../../utils/debounce';

const GoalsForm = ({history, setHistory, editingGoal, setEditingGoal}) => {

    const [goalData, setGoalData] = useState({
        title: '',
        specific: '',
        measurable: '',
        achievable: '',
        relevant: '',
        timebound: '',
    });

    // New state for title generation
    const [generatedTitle, setGeneratedTitle] = useState('');
    const [customTitle, setCustomTitle] = useState('');
    const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    // Validation configuration - easy to adjust in the future
    const VALIDATION_RULES = {
        specific: {
            minWords: 5,
            hint: "Try to be more specific - describe exactly what you want to achieve"
        },
        measurable: {
            minWords: 3,
            hint: "Include numbers, quantities, or clear indicators of progress"
        }
    };

    // Helper function to count words
    const countWords = (text) => {
        return text.trim().split(/\s+/).filter(word => word.length > 0).length;
    };

    // Helper function to check if field meets validation requirements
    const getFieldValidation = (fieldName, value) => {
        const rule = VALIDATION_RULES[fieldName];
        if (!rule) return { isValid: true, wordCount: 0 };
        
        const wordCount = countWords(value);
        const isValid = wordCount >= rule.minWords || value.trim() === '';
        
        return { 
            isValid, 
            wordCount, 
            minWords: rule.minWords,
            hint: rule.hint,
            showHint: !isValid && value.trim() !== ''
        };
    };

    // Title generation function
    const generateTitle = useCallback(async (formData) => {
        if (!hasEnoughContentForGeneration(formData) || customTitle) {
            return setGeneratedTitle(''); // if not enough content or user has custom title, clear the generated title
        }
        
        setIsGeneratingTitle(true);
        
        // Simulate slight delay for better UX (remove this in production if using real API)
        setTimeout(() => {
            const title = generateGoalTitle(formData);
            setGeneratedTitle(title);
            setIsGeneratingTitle(false);
        }, 800);
    }, [customTitle]);

    // Use useRef to store the debounced function
    const debouncedGenerateTitle = useRef(null);

    // Initialize the debounced function
    useEffect(() => {
        debouncedGenerateTitle.current = debounce(generateTitle, 1200);
    }, [generateTitle]);

    // When editingGoal changes, load it into the form
    useEffect(() => {
        if (editingGoal) {
            setGoalData(editingGoal.goal);
            setIsEditing(true);
            setEditingIndex(editingGoal.index);
            // Set the title appropriately when editing
            if (editingGoal.goal.title) {
                setCustomTitle(editingGoal.goal.title);
                setGeneratedTitle('');
            }
        }
    }, [editingGoal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newGoalData = {
            ...goalData,
            [name]: value,
        };
        setGoalData(newGoalData);

        // Trigger title generation if user hasn't set a custom title
        if (!customTitle && debouncedGenerateTitle.current) {
            debouncedGenerateTitle.current(newGoalData);
        }
    };

    const handleTitleEdit = (newTitle) => {
        setCustomTitle(newTitle);
        // Clear generated title when user sets custom title
        if (newTitle.trim()) {
            setGeneratedTitle('');
        }
    };

    const handleSave = () => {
        // Validate that at least some fields have content
        const hasValidContent = Object.values(goalData).some(value => value.trim() !== '');
        
        if (!hasValidContent) {
            alert('Please fill in at least one field before saving your goal.');
            return;
        }

        // Use custom title if set, otherwise use generated title, fallback to "Untitled Goal"
        const finalTitle = customTitle || generatedTitle || 'Untitled Goal';

        const goalToSave = {
            ...goalData,
            title: finalTitle
        };

        if (isEditing && editingIndex !== null) {
            // Update existing goal
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
            // Add new goal - mark as unviewed
            setHistory([{ 
                ...goalToSave, 
                dateSaved: new Date().toLocaleString(),
                isViewed: false,
                dateViewed: null
            }, ...history]);
        }
        
        // Clear form
        setGoalData({
            title: '',
            specific: '',
            measurable: '',
            achievable: '',
            relevant: '',
            timebound: '',
        });
        setGeneratedTitle('');
        setCustomTitle('');
    };

    const handleClear = () => {
        setGoalData({
            title: '',
            specific: '',
            measurable: '',
            achievable: '',
            relevant: '',
            timebound: '',
        });
        setGeneratedTitle('');
        setCustomTitle('');
        setIsEditing(false);
        setEditingIndex(null);
        setEditingGoal(null);
    };

    const handleShareToNotes = async () => {
        const finalTitle = customTitle || generatedTitle || 'Untitled Goal';
        const goalToShare = { ...goalData, title: finalTitle };
        const goalText = new Goal(goalToShare).toFormattedText();
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'My Success Goal',
                    text: goalText,
                });
                console.log('Shared successfully!');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            alert('Web Share API is not supported in your browser.');
        }
    };

    const handleDownload = () => {
        const finalTitle = customTitle || generatedTitle || 'Untitled Goal';
        const goalToDownload = { ...goalData, title: finalTitle };
        const goalText = new Goal(goalToDownload).toFormattedText();
        
        const blob = new Blob([goalText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Success_Goal.txt';
        link.click();
        URL.revokeObjectURL(url);
    };

    // Check if form has content for conditional button display
    const hasContent = Object.values(goalData).some(value => value.trim() !== '');

    // Get validation info for specific field
    const specificValidation = getFieldValidation('specific', goalData.specific);
    const measurableValidation = getFieldValidation('measurable', goalData.measurable);

    return (
        <div className="goalsform-container">
            <h2 className="goalsform-title">Make your Goal</h2>

            {/* Generated Title Display - replaces the old title input */}
            <GeneratedTitleDisplay
                generatedTitle={generatedTitle}
                customTitle={customTitle}
                isGenerating={isGeneratingTitle}
                onTitleEdit={handleTitleEdit}
                hasContent={hasContent}
            />

            <div className="goalsform-field">
                <label htmlFor="specific" className="goalsform-label">Be specific</label>
                <input
                    type="text"
                    id="specific"
                    name="specific"
                    className={`goalsform-input ${specificValidation.showHint ? 'validation-warning' : ''}`}
                    placeholder="What do you want to achieve?"
                    value={goalData.specific}
                    onChange={handleChange}
                />
                {specificValidation.showHint && (
                    <div className="field-hint warning">
                        <span className="hint-icon">💡</span>
                        {specificValidation.hint} ({specificValidation.wordCount}/{specificValidation.minWords} words)
                    </div>
                )}
                {goalData.specific.trim() && specificValidation.isValid && (
                    <div className="field-hint success">
                        <span className="hint-icon">✓</span>
                        Great! This looks specific enough.
                    </div>
                )}
            </div>

            <div className="goalsform-field">
                <label htmlFor="measurable" className="goalsform-label">Make it measurable</label>
                <input
                    type="text"
                    id="measurable"
                    name="measurable"
                    className={`goalsform-input ${measurableValidation.showHint ? 'validation-warning' : ''}`}
                    placeholder="How will you measure your progress?"
                    value={goalData.measurable}
                    onChange={handleChange}
                />
                {measurableValidation.showHint && (
                    <div className="field-hint warning">
                        <span className="hint-icon">📊</span>
                        {measurableValidation.hint} ({measurableValidation.wordCount}/{measurableValidation.minWords} words)
                    </div>
                )}
                {goalData.measurable.trim() && measurableValidation.isValid && (
                    <div className="field-hint success">
                        <span className="hint-icon">✓</span>
                        Perfect! This goal can be measured.
                    </div>
                )}
            </div>

            <div className="goalsform-field">
                <label htmlFor="achievable" className="goalsform-label">Make sure it's achievable</label>
                <textarea
                    id="achievable"
                    name="achievable"
                    className="goalsform-textarea"
                    placeholder="How will you achieve this goal?"
                    value={goalData.achievable}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div className="goalsform-field">
                <label htmlFor="relevant" className="goalsform-label">Make it relevant</label>
                <input
                    type="text"
                    id="relevant"
                    name="relevant"
                    className="goalsform-input"
                    placeholder="Why is this goal relevant to you?"
                    value={goalData.relevant}
                    onChange={handleChange}
                />
            </div>
            {/* Time-bound field */}
            <div className="goalsform-field">
                <label htmlFor="timebound" className="goalsform-label">Keep it time-bound</label>
                <input
                    type="date"
                    id="timebound"
                    name="timebound"
                    className="goalsform-input"
                    value={goalData.timebound}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={handleChange}
                    title="Select a deadline for your goal"
                    required
                />
            </div>
            <div className="goalsform-actions">
                <button
                    onClick={handleSave}
                    className="goalsform-save-btn"
                    disabled={!hasContent}
                >
                    {isEditing ? "Update Goal" : "Save Goal"}
                </button>
                
                {hasContent && (
                    <div className="goalsform-secondary-actions">
                        <button onClick={handleClear} title="Clear Form" className="goalsform-action-btn">
                            <TrashIcon className="goalsform-icon" />
                        </button>
                        <button onClick={handleShareToNotes} title="Share" className="goalsform-action-btn">
                            <ShareIcon className="goalsform-icon" />
                        </button>
                        <button onClick={handleDownload} title="Download" className="goalsform-action-btn">
                            <DownloadIcon className="goalsform-icon" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GoalsForm;
