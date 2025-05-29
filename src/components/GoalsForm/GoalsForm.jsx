import React, {useState, useEffect} from 'react';
import { ShareIcon, DownloadIcon, TrashIcon } from '@heroicons/react/outline';
import './GoalsForm.css';

const GoalsForm = ({history, setHistory, editingGoal, setEditingGoal}) => {

    const [goalData, setGoalData] = useState({
        title: '',
        specific: '',
        measurable: '',
        achievable: '',
        relevant: '',
        timebound: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    // When editingGoal changes, load it into the form
    useEffect(() => {
        if (editingGoal) {
            setGoalData(editingGoal.goal);
            setIsEditing(true);
            setEditingIndex(editingGoal.index);
        }
    }, [editingGoal]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGoalData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        // Validate that at least some fields have content
        const hasValidContent = Object.values(goalData).some(value => value.trim() !== '');
        
        if (!hasValidContent) {
            alert('Please fill in at least one field before saving your goal.');
            return;
        }

        if (isEditing && editingIndex !== null) {
            // Update existing goal
            const updatedHistory = [...history];
            updatedHistory[editingIndex] = { 
                ...goalData, 
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
                ...goalData, 
                dateSaved: new Date().toLocaleString(),
                isViewed: false,
                dateViewed: null
            }, ...history]);
        }
        setGoalData({
            title: '',
            specific: '',
            measurable: '',
            achievable: '',
            relevant: '',
            timebound: '',
        });
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
        setIsEditing(false);
        setEditingIndex(null);
        setEditingGoal(null);
    };

    const handleShareToNotes = async () => {
        const goalText = `
            Success Goal
            -----------
            Title: ${goalData.title}
            Specific: ${goalData.specific}
            Measurable: ${goalData.measurable}
            Achievable: ${goalData.achievable}
            Relevant: ${goalData.relevant}
            Time-bound: ${goalData.timebound}
        `;
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
        const goalText = `
            Success Goal
            -----------
            Title: ${goalData.title}
            Specific: ${goalData.specific}
            Measurable: ${goalData.measurable}
            Achievable: ${goalData.achievable}
            Relevant: ${goalData.relevant}
            Time-bound: ${goalData.timebound}
        `;
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

    return (
        <div className="goalsform-container">
            <h2 className="goalsform-title">Make your Goal</h2>

            <div className="goalsform-field">
                <label htmlFor="title" className="goalsform-label">Name it</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="goalsform-input"
                    placeholder="Give a name to your goal"
                    value={goalData.title}
                    onChange={handleChange}
                />
            </div>
            <div className="goalsform-field">
                <label htmlFor="specific" className="goalsform-label">Be specific</label>
                <input
                    type="text"
                    id="specific"
                    name="specific"
                    className="goalsform-input"
                    placeholder="What do you want to achieve?"
                    value={goalData.specific}
                    onChange={handleChange}
                />
            </div>
            <div className="goalsform-field">
                <label htmlFor="measurable" className="goalsform-label">Make it measurable</label>
                <input
                    type="text"
                    id="measurable"
                    name="measurable"
                    className="goalsform-input"
                    placeholder="How will you measure your progress?"
                    value={goalData.measurable}
                    onChange={handleChange}
                />
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
