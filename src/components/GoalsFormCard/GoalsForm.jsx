// import React, { useState } from 'react';
import { ShareIcon, DownloadIcon, TrashIcon } from '@heroicons/react/outline';
import './GoalsForm.css';
import GeneratedTitleDisplay from '../GeneratedTitleDisplay/GeneratedTitleDisplay';
import { useGoalForm } from '../../hooks/useGoalForm';
import { getAllFieldValidations } from '../../utils/goalValidation';
import { shareGoal, downloadGoal } from '../../utils/goalFormUtils';

const GoalsForm = ({ history, setHistory, editingGoal, setEditingGoal, onGoalSaved, setShowReminderCard }) => {
    const {
        goalData,
        generatedTitle,
        customTitle,
        isGeneratingTitle,
        isEditing,
        hasContent,
        handleChange,
        handleTitleEdit,
        handleSave,
        clearForm,
        getFinalTitle
    } = useGoalForm(history, setHistory, editingGoal, setEditingGoal);

    // Get all field validations
    const fieldValidations = getAllFieldValidations(goalData);

    // Handle share action
    const handleShareToNotes = async () => {
        await shareGoal(goalData, getFinalTitle());
    };

    // Handle download action
    const handleDownload = () => {
        downloadGoal(goalData, getFinalTitle());
    };

    // Modified save handler to trigger parent callback
    const handleSaveWithReminders = async () => {
        const saveResult = await handleSave();
        if (saveResult && onGoalSaved) {
            // Notify parent that goal was saved
            onGoalSaved({ ...goalData, title: getFinalTitle() });
            setShowReminderCard(true);
        }
    };

    // Render validation hint component
    const renderValidationHint = (fieldName, validation) => {
        if (validation.showHint) {
            return (
                <div className="field-hint warning">
                    <span className="hint-icon">💡</span>
                    {validation.hint} ({validation.wordCount}/{validation.minWords} words)
                </div>
            );
        }
        
        if (goalData[fieldName]?.trim() && validation.isValid) {
            return (
                <div className="field-hint success">
                    <span className="hint-icon">✓</span>
                    Great! This looks {fieldName === 'specific' ? 'specific enough' : 
                                      fieldName === 'measurable' ? 'measurable' :
                                      fieldName === 'achievable' ? 'achievable' :
                                      'relevant'}.
                </div>
            );
        }
        
        return null;
    };

    return (
        <div className="goalsform-container">
            <h2 className="goalsform-title">Make your Goal</h2>

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
                    className={`goalsform-input ${fieldValidations.specific?.showHint ? 'validation-warning' : ''}`}
                    placeholder="What do you want to achieve?"
                    value={goalData.specific}
                    onChange={handleChange}
                />
                {renderValidationHint('specific', fieldValidations.specific)}
            </div>

            <div className="goalsform-field">
                <label htmlFor="measurable" className="goalsform-label">Make it measurable</label>
                <input
                    type="text"
                    id="measurable"
                    name="measurable"
                    className={`goalsform-input ${fieldValidations.measurable?.showHint ? 'validation-warning' : ''}`}
                    placeholder="How will you measure your progress?"
                    value={goalData.measurable}
                    onChange={handleChange}
                />
                {renderValidationHint('measurable', fieldValidations.measurable)}
            </div>

            <div className="goalsform-field">
                <label htmlFor="achievable" className="goalsform-label">Make sure it's achievable</label>
                <textarea
                    id="achievable"
                    name="achievable"
                    className={`goalsform-textarea ${fieldValidations.achievable?.showHint ? 'validation-warning' : ''}`}
                    placeholder="How will you achieve this goal?"
                    value={goalData.achievable}
                    onChange={handleChange}
                />
                {renderValidationHint('achievable', fieldValidations.achievable)}
            </div>

            <div className="goalsform-field">
                <label htmlFor="relevant" className="goalsform-label">Make it relevant</label>
                <input
                    type="text"
                    id="relevant"
                    name="relevant"
                    className={`goalsform-input ${fieldValidations.relevant?.showHint ? 'validation-warning' : ''}`}
                    placeholder="Why is this goal relevant to you?"
                    value={goalData.relevant}
                    onChange={handleChange}
                />
                {renderValidationHint('relevant', fieldValidations.relevant)}
            </div>

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
                    onClick={handleSaveWithReminders}
                    className="goalsform-save-btn"
                    disabled={!hasContent}
                >
                    {isEditing ? "Update Goal" : "Save Goal"}
                </button>
                
                {hasContent && (
                    <div className="goalsform-secondary-actions">
                        <button onClick={clearForm} title="Clear Form" className="goalsform-action-btn">
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
